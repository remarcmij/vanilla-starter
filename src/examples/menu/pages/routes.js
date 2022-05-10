import createConverterPage from '../../currency-converter/pages/converterPage.js';
import githubRoutes from '../../github/pages/routes.js';
import nobelprizeRoutes from '../../nobelprize/pages/routes.js';
import createPokemonsPage from '../../pokemons/pages/pokemonsPage.js';
import stopwatchRoutes from '../../stopwatch/pages/routes.js';
import createHomePage from './homePage.js';
import starterHomePage from '../../../pages/homePage.js';

const routes = [
  { path: 'menu', page: createHomePage, default: true },
  { path: 'counter', page: starterHomePage },
  { path: 'currency', page: createConverterPage },
  { path: 'pokemon', page: createPokemonsPage },
  ...stopwatchRoutes,
  ...githubRoutes,
  ...nobelprizeRoutes,
];

export default routes;
