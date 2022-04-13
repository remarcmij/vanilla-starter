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

  const updateState = (updates) => {
    const prevState = state;
    state = { ...prevState, ...updates };
    pokemonsView.update(state, prevState);
  };

  const getPokemons = async () => {
    updateState({ loading: true, error: null });

    try {
      const data = await fetchData(`${BASE_URL}?limit=151`);
      data.results.sort((a, b) => a.name.localeCompare(b.name));
      updateState({ pokemons: data.results, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  };

  const fetchImage = async (e) => {
    const url = e.target.value;
    if (!url) {
      return;
    }

    updateState({ loading: true, error: null });

    try {
      const pokemon = await fetchData(url, { cache: true });
      updateState({ pokemon, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  };

  const onGetClick = () => getPokemons();
  const onChange = (e) => fetchImage(e);

  const viewProps = { onGetClick, onChange };
  const pokemonsView = createPokemonsView(viewProps);

  return pokemonsView;
}

export default createPokemonsPage;
