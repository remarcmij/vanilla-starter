import createErrorPage from './errorPage.js';
import createHomePage from './homePage.js';
import createPokemonsPage from './pokemonsPage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'pokemons', page: createPokemonsPage },
  { path: 'error', page: createErrorPage },
];

export default routes;
