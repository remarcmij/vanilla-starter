import createIntroPage from './introPage.js';
import createPokemonsPage from './pokemonsPage.js';

const routes = [
  { path: 'po-intro', page: createIntroPage },
  { path: 'po-pokemons', page: createPokemonsPage },
];

export default routes;
