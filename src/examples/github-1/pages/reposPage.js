import loadPage from '../../../lib/loadPage.js';
import log from '../../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createErrorPage from '../views/errorView.js';
import createReposView from '../views/reposView.js';
import createRepoDetailPage from './repoDetailPage.js';

function createReposPage(state) {
  // Event handlers
  const onItemClick = (repo) => {
    state = { ...state, repo };
    loadPage(createRepoDetailPage, state);
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
    const organization = e.target.value;
    state = { ...state, organization };
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
    state = { ...state, loading: true, error: null, repos: null };
    reposView.update(state);

    try {
      const repos = await fetchRepos(state.organization);
      state = { ...state, repos, loading: false };
      reposView.update(state);
    } catch (error) {
      log.error('createReposPage', error.message);
      state = { ...state, error, loading: false };
      reposView.update(state);
      loadPage(createErrorPage, state);
      return;
    }
  };

  getData();

  return reposView;
}

export default createReposPage;
