import githubRoutes from '../../github/pages/routes.js';
import nobelprizeRoutes from '../../nobelprize/pages/routes.js';
import pokemonsRoutes from '../../pokemons/pages/routes.js';
import stopwatchRoutes from '../../stopwatch/pages/routes.js';
import createErrorPage from './errorPage.js';
import createHomePage from './homePage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'error', page: createErrorPage },
  ...githubRoutes,
  ...nobelprizeRoutes,
  ...stopwatchRoutes,
  ...pokemonsRoutes,
];

export default routes;
