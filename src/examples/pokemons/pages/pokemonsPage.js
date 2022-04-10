import createPokemonsView from '../views/pokemonsView.js';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function createPokemonsPage() {
  let state = {};

  const getPokemons = async () => {
    state = { ...state, loading: true, error: null };
    pokemonsView.update(state);

    try {
      const data = await fetchData(`${BASE_URL}?limit=151`);
      data.results.sort((a, b) => a.name.localeCompare(b.name));
      state = { ...state, pokemons: data.results, loading: false };
      pokemonsView.update(state);
    } catch (error) {
      state = { ...state, error, loading: false };
      pokemonsView.update(state);
    }
  };

  const fetchImage = async (e) => {
    const url = e.target.value;
    if (!url) {
      return;
    }

    state = { ...state, loading: true, error: null };
    pokemonsView.update(state);

    try {
      const pokemon = await fetchData(url, { cache: true });
      state = { ...state, pokemon, loading: false };
      pokemonsView.update(state);
    } catch (error) {
      state = { ...state, error, loading: false };
      pokemonsView.update(state);
    }
  };

  const onGetClick = () => getPokemons();
  const onChange = (e) => fetchImage(e);

  const viewProps = { onGetClick, onChange };
  const pokemonsView = createPokemonsView(viewProps);

  return pokemonsView;
}

export default createPokemonsPage;
