import fetchData from '../../../lib/fetchData.js';
import router from '../../../lib/router.js';
import fetchPokemons from '../fetchers/pokemonsFetcher.js';
import state$ from '../state.js';
import createPokemonsView from '../views/pokemonsView.js';

function createPokemonsPage() {
  state$.update({ pokemons: null, pokemon: null });

  const getPokemons = async () => {
    state$.update({ loading: true, error: null });

    try {
      const data = await fetchPokemons();
      data.results.sort((a, b) => a.name.localeCompare(b.name));
      state$.update({ pokemons: data.results, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
      router.navigateTo('error');
    }
  };

  const fetchImage = async (e) => {
    const url = e.target.value;
    if (!url) {
      return;
    }

    state$.update({ loading: true, error: null });

    try {
      const pokemon = await fetchData(url, { cache: true });
      state$.update({ pokemon, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
      router.navigateTo('error');
    }
  };

  const onGetClick = () => getPokemons();
  const onChange = (e) => fetchImage(e);

  const viewProps = { onGetClick, onChange };
  const pokemonsView = createPokemonsView(viewProps);

  const pageDidLoad = () => {
    state$.subscribe(pokemonsView.update);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(pokemonsView.update);
  };

  return { ...pokemonsView, pageDidLoad, pageWillUnload };
}

export default createPokemonsPage;
