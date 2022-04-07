import router from '../../../lib/router.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(pageProps) {
  let state = {};
  const [organization, repoName] = pageProps.params;
  const repoView = createRepoDetailView({ organization });

  const getData = async () => {
    state = {
      ...state,
      error: null,
      loading: true,
      repo: null,
      contributors: null,
    };
    repoView.update(state);

    let repo, contributors;

    try {
      ({ repo, contributors } = await fetchRepo(organization, repoName));
      state = { ...state, repo, contributors, loading: false };
      repoView.update(state);
    } catch (error) {
      state = { ...state, error, loading: false };
      repoView.update(state);
      router.navigateTo('error');
      return;
    }
  };

  getData();

  return repoView;
}

export default createRepoDetailPage;
