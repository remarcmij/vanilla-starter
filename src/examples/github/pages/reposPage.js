import router from '../../../lib/router.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import state$ from '../state.js';
import createReposView from '../views/reposView.js';

function createReposPage(props) {
  const [organization = 'HackYourFuture'] = props.params;
  state$.update({ organization });

  const onItemClick = (repo) => {
    router.navigateTo('gh-repo', organization, repo.name);
  };

  const onFilterInput = (e) => {
    const filter = e.target.value.trim().toLowerCase();
    state$.update({ filter });
  };

  const onClearFilter = () => {
    state$.update({ filter: '' });
  };

  const onOrganizationChange = (e) => {
    router.navigateTo('gh-repos', e.target.value);
  };

  const viewProps = {
    onItemClick,
    onFilterInput,
    onClearFilter,
    onOrganizationChange,
  };

  const reposView = createReposView(viewProps);

  const getData = async () => {
    state$.update({ error: null, loading: true, repos: null });

    try {
      const repos = await fetchRepos(organization);
      state$.update({ repos, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
      router.navigateTo('gh-error');
      return;
    }
  };

  getData();

  const pageDidLoad = () => {
    state$.subscribe(reposView);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(reposView);
  };

  return { ...reposView, pageDidLoad, pageWillUnload };
}

export default createReposPage;
