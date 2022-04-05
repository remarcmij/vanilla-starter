import router from '../../lib/router.js';
import log from '../../lib/logger.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(owner, repoName) {
  const repoView = createRepoDetailView();

  const getData = async () => {
    router.updateState({
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
      router.updateState({ error, loading: false });
      router.navigateTo('error');
      return;
    }

    router.updateState({ repo, contributors, loading: false });
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
