import loadPage from '../../../lib/pageLoader.js';
import log from '../../../lib/logger.js';
import fetchContributors from '../fetchers/contributorsFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';
import createErrorPage from './errorPage.js';
import createReposPage from './reposPage.js';

function createRepoDetailPage(state) {
  const updateState = (updates) => {
    log.debug('state', state);
    state = { ...state, ...updates };
    repoView.update(state);
  };

  const onBackClick = () => loadPage(createReposPage, state);

  const repoView = createRepoDetailView({ onBackClick });

  const getData = async () => {
    updateState({ loading: true, error: null, contributors: null });

    try {
      const contributors = await fetchContributors(state.repo);
      updateState({ contributors, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
      loadPage(createErrorPage, state);
      return;
    }
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
