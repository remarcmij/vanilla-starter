import loadPage from '../../../lib/loadPage.js';
import log from '../../../lib/logger.js';
import fetchContributors from '../fetchers/contributorsFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';
import createErrorPage from './errorPage.js';
import createReposPage from './reposPage.js';

function createRepoDetailPage(state) {
  const onBackClick = () => loadPage(createReposPage, state);

  const repoView = createRepoDetailView({ onBackClick });

  const getData = async () => {
    state = { ...state, loading: true, error: null, contributors: null };
    repoView.update(state);

    try {
      const { repo } = state;
      const contributors = await fetchContributors(repo);
      state = { ...state, contributors, loading: false };
      repoView.update(state);
    } catch (error) {
      log.error('createRepoDetailPage', error.message);
      state = { ...state, error, loading: false };
      repoView.update(state);
      loadPage(createErrorPage);
      return;
    }
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
