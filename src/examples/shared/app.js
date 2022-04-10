import routes from '../shared/pages/routes.js';
import log from '../../lib/logger.js';
import router from '../../lib/router.js';

function loadApp() {
  // Set the desired log level
  log.setLevel('debug');

  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  // Start the router
  router.start(routes, pageRoot);
}

export default loadApp;
