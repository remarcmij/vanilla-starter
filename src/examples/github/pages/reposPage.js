import state from '../../../lib/observableState.js';
import router from '../../../lib/router.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import createReposView from '../views/reposView.js';

function createReposPage(organization = 'HackYourFuture') {
  state.update({ organization });

  const onItemClick = (repo) => {
    router.navigateTo('repo', organization, repo.name);
  };

  const onFilterInput = (e) => {
    const filter = e.target.value.trim().toLowerCase();
    state.update({ filter });
  };

  const onClearFilter = () => {
    state.update({ filter: '' });
  };

  const onOrganizationChange = (e) => {
    router.navigateTo('repos', e.target.value);
  };

  const viewProps = {
    onItemClick,
    onFilterInput,
    onClearFilter,
    onOrganizationChange,
  };

  const reposView = createReposView(viewProps);

  const getData = async () => {
    state.update({ error: null, loading: true, repos: null });

    let repos;

    try {
      repos = await fetchRepos(organization);
      state.update({ repos, loading: false });
    } catch (error) {
      state.update({ error, loading: false });
      router.navigateTo('error');
      return;
    }
  };

  getData();

  const pageDidMount = () => {
    state.subscribe(reposView.update);
  };

  const pageWillUnmount = () => {
    state.unsubscribe(reposView.update);
  };

  return { ...reposView, pageDidMount, pageWillUnmount };
}

export default createReposPage;
