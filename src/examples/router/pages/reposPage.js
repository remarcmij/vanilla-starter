import router from '../../../lib/router.js';
import log from '../../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

function createReposPage() {
  const onItemClick = (repo) =>
    router.navigateTo('repo', repo.owner.login, repo.name);
  const onFilterInput = (e) => {
    router.updateState({ filter: e.target.value.trim().toLowerCase() });
  };

  const onClearFilter = () => {
    router.updateState({ filter: '' });
  };

  const onOrganizationChange = (e) => {
    router.updateState({ organization: e.target.value });
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
    router.updateState({ error: null, loading: true, repos: null });

    let repos;

    try {
      repos = await fetchRepos(router.getState().organization);
    } catch (error) {
      log.error('createReposPage', error.message);
      router.updateState({ error, loading: false });
      router.navigateTo('error');
      return;
    }

    router.updateState({ repos, loading: false });
  };

  getData();

  return reposView;
}

export default createReposPage;
