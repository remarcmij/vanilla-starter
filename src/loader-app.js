import state from './examples/base/pages/state.js';
import log from './lib/logger.js';
import pageLoader from './lib/pageLoader.js';
import createReposPage from './examples/loader/pages/reposPage.js';

function loadApp() {
  // Set the desired log level
  log.setLevel('debug');
  log.info('application', 'started');

  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  pageLoader.initialize(pageRoot, state);
  pageLoader.load(createReposPage);
}

export default loadApp;
