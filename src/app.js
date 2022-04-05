import data from './data.js';
// import routes from './pages/routes.js'
import routes from './example/pages/routes.js';
import router from './lib/router.js';
import log from './lib/logger.js';

function loadApp() {
  // Set the desired log level
  log.setLevel('debug');
  log.info('application', 'started');

  const appRoot = document.getElementById('app-root');

  // Create a DOM element that will serve as the mount point
  // used by the router for loading paging.
  const routerOutlet = document.createElement('div');
  routerOutlet.id = 'router-outlet';
  appRoot.appendChild(routerOutlet);

  // Start the router
  router.start(routes, routerOutlet, data);
}

window.addEventListener('load', loadApp);
