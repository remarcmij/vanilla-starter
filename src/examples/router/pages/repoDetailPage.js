import state from '../../../lib/observableState.js';
import router from '../../../lib/router.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(pageProps) {
  const [organization, repoName] = pageProps.params;
  const repoView = createRepoDetailView({ organization });

  const getData = async () => {
    state.update({
      error: null,
      loading: true,
      repo: null,
      contributors: null,
    });

    let repo, contributors;

    try {
      ({ repo, contributors } = await fetchRepo(organization, repoName));
      state.update({ repo, contributors, loading: false });
    } catch (error) {
      state.update({ error, loading: false });
      router.navigateTo('error');
      return;
    }
  };

  getData();

  const pageDidMount = () => {
    state.subscribe(repoView.update);
  };

  const pageWillUnmount = () => {
    state.unsubscribe(repoView.update);
  };

  return { ...repoView, pageDidMount, pageWillUnmount };
}

export default createRepoDetailPage;
