import pageLoader from '../../../lib/pageLoader.js';
import log from '../../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';
import createRepoDetailPage from './repoDetailPage.js';

function createReposPage() {
  const onItemClick = (repo) => {
    pageLoader.load(createRepoDetailPage, repo.owner.login, repo.name);
  };

  const onFilterInput = (e) => {
    pageLoader.updateState({ filter: e.target.value.trim().toLowerCase() });
  };

  const onClearFilter = () => {
    pageLoader.updateState({ filter: '' });
  };

  const onOrganizationChange = (e) => {
    pageLoader.updateState({ organization: e.target.value });
    getData();
  };

  const props = {
    onItemClick,
    onFilterInput,
    onClearFilter,
    onOrganizationChange,
  };

  const reposView = createReposView(props);

  const getData = async () => {
    pageLoader.updateState({ error: null, loading: true, repos: null });

    let repos;

    try {
      repos = await fetchRepos(pageLoader.getState().organization);
    } catch (error) {
      log.error('createReposPage', error.message);
      pageLoader.updateState({ error, loading: false });
      pageLoader.navigateTo('error');
      return;
    }

    pageLoader.updateState({ repos, loading: false });
  };

  getData();

  return reposView;
}

export default createReposPage;
