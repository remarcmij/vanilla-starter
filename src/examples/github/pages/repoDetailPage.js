import router from '../../../lib/router.js';
import fetchRepo from '../fetchers/repoFetcher.js';
import state$ from '../state.js';
import createRepoDetailView from '../views/repoDetailView.js';

function createRepoDetailPage(props) {
  const [organization, repoName] = props.params;
  const repoView = createRepoDetailView({ organization });

  const getData = async () => {
    state$.update({
      error: null,
      loading: true,
      repo: null,
      contributors: null,
    });

    let repo, contributors;

    try {
      ({ repo, contributors } = await fetchRepo(organization, repoName));
      state$.update({ repo, contributors, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
      router.navigateTo('gh-error');
      return;
    }
  };

  getData();

  const pageDidLoad = () => {
    state$.subscribe(repoView);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(repoView);
  };

  return { ...repoView, pageDidLoad, pageWillUnload };
}

export default createRepoDetailPage;
