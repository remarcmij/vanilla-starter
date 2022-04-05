import log from '../../../lib/logger.js';
import pageLoader from '../../../lib/pageLoader.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';
import createErrorPage from './errorPage.js';
import createReposPage from './reposPage.js';

function createRepoDetailPage(owner, repoName) {
  const onBackClick = () => pageLoader.load(createReposPage);
  const repoView = createRepoDetailView({ onBackClick });

  const getData = async () => {
    pageLoader.updateState({
      error: null,
      loading: true,
      repo: null,
      contributors: null,
    });

    let repo, contributors;

    try {
      ({ repo, contributors } = await fetchRepo(owner, repoName));
    } catch (error) {
      log.error('createRepoDetailPage', error.message);
      pageLoader.updateState({ error, loading: false });
      pageLoader.load(createErrorPage);
      return;
    }

    pageLoader.updateState({ repo, contributors, loading: false });
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
