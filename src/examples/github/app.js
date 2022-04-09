import log from '../../lib/logger.js';
import observableState from '../../lib/observableState.js';
import router from '../../lib/router.js';
import routes from './pages/routes.js';

function loadApp() {
  // Set the desired log level
  log.setLevel('debug');

  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  observableState.subscribe((state) => {
    log.debug('state', state);
  });

  // Start the router
  router.start(routes, pageRoot);
}

export default loadApp;
