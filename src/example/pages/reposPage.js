import router from '../../lib/router.js';
import log from '../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

function createReposPage() {
  const props = {
    onItemClick: (repo) =>
      router.navigateTo('repo', repo.owner.login, repo.name),
    onFilterInput: (e) => {
      router.updateState({ filter: e.target.value.trim().toLowerCase() });
    },
    onClearFilter: () => {
      router.updateState({ filter: '' });
    },
    onOrganizationChange: (e) => {
      router.updateState({ organization: e.target.value });
      getData();
    },
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
