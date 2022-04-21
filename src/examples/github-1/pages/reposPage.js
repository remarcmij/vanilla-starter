import loadPage from '../../../lib/pageLoader.js';
import logger from '../../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createErrorPage from '../views/errorView.js';
import createReposView from '../views/reposView.js';
import createRepoDetailPage from './repoDetailPage.js';

function createReposPage(state) {
  const updateState = (updates) => {
    logger.debug('state', state);
    state = { ...state, ...updates };
    reposView.update(state);
  };

  // Event handlers
  const onItemClick = (repo) => {
    updateState({ repo });
    loadPage(createRepoDetailPage, state);
  };

  const onFilterInput = (e) => {
    const filter = e.target.value.trim().toLowerCase();
    updateState({ filter });
  };

  const onClearFilter = () => {
    updateState({ filter: '' });
  };

  const onOrganizationChange = (e) => {
    const organization = e.target.value;
    updateState({ organization });
  };

  const props = {
    onItemClick,
    onFilterInput,
    onClearFilter,
    onOrganizationChange,
  };
  const reposView = createReposView(props);

  const getData = async () => {
    updateState({ loading: true, error: null, repos: null });

    try {
      const repos = await fetchRepos(state.organization);
      updateState({ repos, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
      loadPage(createErrorPage, state);
      return;
    }
  };

  getData();

  return reposView;
}

export default createReposPage;
