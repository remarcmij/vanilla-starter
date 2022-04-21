import createIntroPage from './pages/introPage.js';
import state from './pages/state.js';
import loadPage from '../../lib/pageLoader.js';
import logger from '../../lib/logger.js';

function loadApp() {
  // Set the desired log level
  logger.setLevel('debug');

  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  loadPage(createIntroPage, state);
}

export default loadApp;
