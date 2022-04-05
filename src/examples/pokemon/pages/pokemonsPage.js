import fetchData from '../../../lib/fetchData.js';
import createPokemonsView from '../views/pokemonsView.js';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const state = {};

function createPokemonsPage() {
  const onGetClick = () => getPokemons();
  const onChange = (e) => fetchImage(e);

  const props = { onGetClick, onChange };
  const pokemonsView = createPokemonsView(props);

  const getPokemons = async () => {
    state.loading = true;
    state.error = null;
    pokemonsView.update(state);

    try {
      const data = await fetchData(API_URL);
      state.pokemons = data.results;
      state.loading = false;
    } catch (error) {
      state.error = error;
      state.loading = false;
    }

    pokemonsView.update(state);
  };

  const fetchImage = async (e) => {
    const url = e.target.value;

    state.loading = true;
    state.error = null;
    pokemonsView.update(state);

    try {
      state.pokemon = await fetchData(url);
      state.loading = false;
    } catch (error) {
      state.error = error;
      state.loading = false;
    }

    pokemonsView.update(state);
  };

  return pokemonsView;
}

export default createPokemonsPage;
