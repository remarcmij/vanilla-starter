import fetchData from '../../../lib/fetchData.js';
import createPokemonsView from '../views/pokemonsView.js';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

function createPokemonsPage() {
  let state = {};

  const getPokemons = async () => {
    state = { ...state, loading: true, error: null };
    pokemonsView.update(state);

    try {
      const data = await fetchData(API_URL);
      state = { ...state, pokemons: data.results, loading: false };
    } catch (error) {
      state = { ...state.error, loading: false };
    }

    pokemonsView.update(state);
  };

  const fetchImage = async (e) => {
    const url = e.target.value;

    state = { ...state, loading: true, error: null };
    pokemonsView.update(state);

    try {
      const pokemon = await fetchData(url);
      state = { ...state, pokemon, loading: false };
    } catch (error) {
      state = { ...state.error, loading: false };
    }

    pokemonsView.update(state);
  };

  const onGetClick = () => getPokemons();
  const onChange = (e) => fetchImage(e);

  const props = { onGetClick, onChange };
  const pokemonsView = createPokemonsView(props);

  return pokemonsView;
}

export default createPokemonsPage;
