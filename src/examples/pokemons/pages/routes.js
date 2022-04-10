import createHomePage from './homePage.js';
import createPokemonsPage from './pokemonsPage.js';

const routes = [
  { path: 'po-home', page: createHomePage },
  { path: 'po-pokemons', page: createPokemonsPage },
];

export default routes;
