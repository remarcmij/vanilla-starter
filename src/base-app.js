import state from './examples/base/pages/state.js';
import homePage from './examples/base/pages/homePage.js';
import loadPage from './lib/loadPage.js';
import log from './lib/logger.js';

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

  loadPage(homePage, state);
}

export default loadApp;
