import createSpinnerView from './spinnerView.js';

function createPokemonsView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Pokemons</h3>
        <button type="button" id="getButton">Get Pokemons</button>
        <select id="pokemonsSelect" class="hide">
          <option selected value="" disabled>Select Pokemon</option>
        </select>
      </div>
    </header>
    <div class="content-container flex-column whiteframe">
      <p id="messageContainer">Press button to get Pokemons.</p>
      <div id="imgContainer" class="po__image-container"></div>
    </div>`;

  // The spinner child view is shown while the pokemons are being fetched.
  const spinnerView = createSpinnerView();
  root.appendChild(spinnerView.root);

  const dom = {};
  dom.getButton = root.querySelector('#getButton');
  dom.pokemonsSelect = root.querySelector('#pokemonsSelect');
  dom.imgContainer = root.querySelector('#imgContainer');
  dom.messageContainer = root.querySelector('#messageContainer');

  dom.getButton.addEventListener('click', props.onGetClick);
  dom.pokemonsSelect.addEventListener('change', props.onChange);
  dom.pokemonsSelect.classList.add('hide');

  let pokemonsPopulated = false;

  const update = (state) => {
    if (state.loading) {
      spinnerView.root.classList.remove('hide');
      return;
    }

    spinnerView.root.classList.add('hide');

    if (state.error) {
      dom.messageContainer.classList.remove('hide');
      dom.messageContainer.textContent = state.error.message;
      return;
    }

    // Populate select element once only
    if (state.pokemons && !pokemonsPopulated) {
      dom.pokemonsSelect.classList.remove('hide');
      state.pokemons.forEach((pokemon) => {
        const option = document.createElement('option');
        option.textContent = pokemon.name;
        option.value = pokemon.url;
        dom.pokemonsSelect.appendChild(option);
      });
      dom.getButton.classList.add('hide');
      dom.messageContainer.textContent =
        'Pokemons fetched but none selected yet.';
      pokemonsPopulated = true;
    }

    if (state.pokemon) {
      dom.messageContainer.classList.add('hide');
      dom.imgContainer.innerHTML = String.raw`
        <img id="pokemon-img"
          height="320"
          src="${state.pokemon.sprites.other.home.front_default}" 
          alt="${state.pokemon.name}">`;
    }
  };

  return { root, update };
}

export default createPokemonsView;
