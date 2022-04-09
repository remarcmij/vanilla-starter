import fetchData from '../../../lib/fetchData.js';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

function fetchPokemons() {
  return fetchData(`${BASE_URL}?limit=151`, { cache: true });
}

export default fetchPokemons;
