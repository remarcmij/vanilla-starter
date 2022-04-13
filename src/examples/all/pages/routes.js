import githubRoutes from '../../github-2/pages/routes.js';
import nobelprizeRoutes from '../../nobelprize/pages/routes.js';
import pokemonsRoutes from '../../pokemons/pages/routes.js';
import stopwatchRoutes from '../../stopwatch/pages/routes.js';
import createHomePage from './homePage.js';
import currencyConverterRoutes from '../../currency-converter/pages/routes.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  ...githubRoutes,
  ...nobelprizeRoutes,
  ...stopwatchRoutes,
  ...pokemonsRoutes,
  ...currencyConverterRoutes,
];

export default routes;
