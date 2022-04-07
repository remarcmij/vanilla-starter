import router from '../../../lib/router.js';
import log from '../../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

function createReposPage(pageProps) {
  const organization = pageProps.params[0] || 'HackYourFuture';
  let state = { organization };

  const onItemClick = (repo) => {
    router.navigateTo('repo', organization, repo.name);
  };

  const onFilterInput = (e) => {
    const filter = e.target.value.trim().toLowerCase();
    state = { ...state, filter };
    reposView.update(state);
  };

  const onClearFilter = () => {
    state = { ...state, filter: '' };
    reposView.update(state);
  };

  const onOrganizationChange = (e) => {
    router.navigateTo('repos', e.target.value);
  };

  const viewProps = {
    onItemClick,
    onFilterInput,
    onClearFilter,
    onOrganizationChange,
  };

  const reposView = createReposView(viewProps);

  const getData = async () => {
    state = { ...state, error: null, loading: true, repos: null };
    reposView.update(state);

    let repos;

    try {
      repos = await fetchRepos(state.organization);
      state = { ...state, repos, loading: false };
      reposView.update(state);
    } catch (error) {
      log.error('fetchRepos', error.message);
      router.navigateTo('error');
      return;
    }
  };

  getData();

  return reposView;
}

export default createReposPage;
