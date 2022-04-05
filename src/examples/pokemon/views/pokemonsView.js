function createPokemonsView(props) {
  const root = document.createElement('div');
  root.className = 'pokemons-container';
  root.innerHTML = String.raw`
    <div id="message-container"></div>
    <button type="button" id="btn-get">Get Pokemons</button>
    <select id="pokemons-select"></select>
    <img id="pokemon-img" hidden>
  `;

  const messageContainer = root.querySelector('#message-container');

  const btnGet = root.querySelector('#btn-get');
  btnGet.addEventListener('click', props.onGetClick);

  const pokemonsSelect = root.querySelector('#pokemons-select');
  pokemonsSelect.addEventListener('change', props.onChange);

  const pokemonImg = root.querySelector('#pokemon-img');

  let pokemonsPopulated = false;

  const update = (state) => {
    if (state.loading) {
      messageContainer.textContent = 'Loading...';
      return;
    }

    if (state.error) {
      messageContainer.textContent = state.error.message;
      return;
    }

    messageContainer.textContent = '';

    if (state.pokemons && !pokemonsPopulated) {
      state.pokemons.forEach((pokemon) => {
        const option = document.createElement('option');
        option.textContent = pokemon.name;
        option.value = pokemon.url;
        pokemonsSelect.appendChild(option);
      });
      pokemonsPopulated = true;
      btnGet.disabled = true;
    }

    if (state.pokemon) {
      pokemonImg.hidden = false;
      pokemonImg.src = state.pokemon.sprites.front_default;
      pokemonImg.alt = state.pokemon.name;
    }
  };

  return { root, update };
}

export default createPokemonsView;
