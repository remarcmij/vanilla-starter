import router from '../../lib/router.js';
import routes from './pages/routes.js';
import log from '../../lib/logger.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');

  log.setLevel('debug');

  router.start(routes, appRoot);
}

export default loadApp;
