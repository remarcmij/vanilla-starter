import loadPage from '../../../lib/loadPage.js';
import log from '../../../lib/logger.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';
import createErrorPage from './errorPage.js';
import createReposPage from './reposPage.js';
import state from './state.js';

function createRepoDetailPage(owner, repoName) {
  const onBackClick = () => loadPage(createReposPage);

  const repoView = createRepoDetailView({ onBackClick });

  const getData = async () => {
    state.error = null;
    state.loading = true;
    state.repo = null;
    state.contributors = null;
    repoView.update(state);

    try {
      const data = await fetchRepo(owner, repoName);
      state.repo = data.repo;
      state.contributors = data.contributors;
      repoView.update(state);
    } catch (error) {
      log.error('createRepoDetailPage', error.message);
      state.error = error;
      state.loading = false;
      repoView.update(state);
      loadPage(createErrorPage);
      return;
    }

    state.loading = false;
    repoView.update(state);
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
