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

  // Internal helper function to update the state and call the `update()` method
  // of the view.
  const updateState = (updates) => {
    state = { ...state, ...updates };
    console.log('state', state);
    view.update(state);
  };

  const getPokemons = async () => {
    // Set the loading state and reset the error state.
    updateState({ loading: true, error: null });

    try {
      const data = await fetchData(`${BASE_URL}?limit=151`);
      data.results.sort((a, b) => a.name.localeCompare(b.name));
      // Loading was successful, update the state accordingly.
      updateState({ pokemons: data.results, loading: false });
    } catch (error) {
      // Loading failed, update the state with the caught error.
      updateState({ error, loading: false });
    }
  };

  const fetchImage = async (e) => {
    const url = e.target.value;

    updateState({ loading: true, error: null });

    try {
      const pokemon = await fetchData(url);
      updateState({ pokemon, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  };

  // Event handlers passed as props to the view.
  const onGetClick = () => getPokemons();
  const onChange = (e) => fetchImage(e);
  const viewProps = { onGetClick, onChange };

  const view = createPokemonsView(viewProps);

  return view;
}

export default createPokemonsPage;
