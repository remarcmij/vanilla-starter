import loadPage from '../../../lib/loadPage.js';
import log from '../../../lib/logger.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createErrorPage from '../views/errorView.js';
import createReposView from '../views/reposView.js';
import createRepoDetailPage from './repoDetailPage.js';
import state from './state.js';

function createReposPage() {
  // Event handlers
  const onItemClick = (repo) => {
    loadPage(createRepoDetailPage, repo.owner.login, repo.name);
  };

  const onFilterInput = (e) => {
    state.filter = e.target.value.trim().toLowerCase();
    reposView.update(state);
  };

  const onClearFilter = () => {
    state.filter = '';
    reposView.update(state);
  };

  const onOrganizationChange = (e) => {
    state.organization = e.target.value;
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
    state.error = null;
    state.loading = true;
    state.repos = null;
    reposView.update(state);

    try {
      state.repos = await fetchRepos(state.organization);
    } catch (error) {
      log.error('createReposPage', error.message);
      state.error = error;
      state.loading = false;
      reposView.update(state);
      loadPage(createErrorPage, state);
      return;
    }

    state.loading = false;
    reposView.update(state);
  };

  getData();

  return reposView;
}

export default createReposPage;
