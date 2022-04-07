import fetchData from '../../../lib/fetchData.js';
import loadPage from '../../../lib/loadPage.js';
import createPokemonsView from '../views/pokemonsView.js';
import createHomePage from './homePage.js';

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

function createPokemonsPage(pageProps) {
  let state = {};

  const { title } = pageProps;

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
  const onHomeClick = () => loadPage(createHomePage);
  const onChange = (e) => fetchImage(e);

  const viewProps = { title, onGetClick, onChange, onHomeClick };
  const pokemonsView = createPokemonsView(viewProps);

  return pokemonsView;
}

export default createPokemonsPage;
