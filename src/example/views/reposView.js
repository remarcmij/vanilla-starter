import createLoadingIndicator from './loadingIndicator.js';
import createRepoListItemView from './repoListItemView.js';
import createToolbarView from './toolbarView.js';

function createReposView(props) {
  const root = document.createElement('div');
  root.className = 'repos-container';
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <a href="#home" class="toolbar-button">
          <i class="fa-solid fa-house"></i>
        </a>
        <div>HYF Repositories</div>
      </div>
    </header>
  `;

  const toolbarView = createToolbarView(props);
  root.appendChild(toolbarView.root);

  const container = document.createElement('div');
  root.appendChild(container);

  const loadingIndicator = createLoadingIndicator();
  container.appendChild(loadingIndicator.root);

  const render = (state) => {
    // clear loading indicator
    container.innerHTML = '';

    const repoList = document.createElement('ul');
    repoList.className = 'no-bullets';
    container.appendChild(repoList);

    let { repos } = state;
    if (state.filter) {
      repos = repos.filter((repo) =>
        repo.name.toLowerCase().startsWith(state.filter)
      );
    }

    repos.forEach((repo) => {
      const listItemView = createRepoListItemView({
        repo,
        onItemClick: props.onItemClick,
      });
      repoList.appendChild(listItemView.root);
    });
  };

  const update = (state) => {
    toolbarView.update(state);

    if (state.loading) {
      loadingIndicator.root.hidden = false;
      return;
    }

    loadingIndicator.root.hidden = true;

    // Do not render if there is an error or if there is no data yet.
    if (state.error || !state.repos) {
      return;
    }

    render(state);
  };

  return { root, update };
}

export default createReposView;
