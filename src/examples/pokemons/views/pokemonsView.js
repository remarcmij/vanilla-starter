import getElementRefs from '../../../lib/getElementRefs.js';
import createSpinnerView from './spinnerView.js';

function createPokemonsView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <a href="#home" class="toolbar-button">
          <i class="fa-solid fa-house"></i>
        </a>
        <h3>Pokemons</h3>
        <button type="button" id="getButton">Get Pokemons</button>
        <select id="pokemonsSelect">
          <option selected value="" disabled>Select Pokemon</option>
        </select>
      </div>
    </header>
    <div id="imgContainer"></div>`;

  const spinnerView = createSpinnerView();
  root.appendChild(spinnerView.root);

  const dom = getElementRefs(root);

  dom.getButton.addEventListener('click', props.onGetClick);
  dom.pokemonsSelect.addEventListener('change', props.onChange);
  dom.pokemonsSelect.classList.add('hide');

  const update = (state, prevState) => {
    if (state.loading) {
      spinnerView.root.classList.remove('hide');
    } else {
      spinnerView.root.classList.add('hide');
    }

    if (state.error) {
      return;
    }

    // Populate select element once only
    if (state.pokemons && !prevState.pokemons) {
      dom.pokemonsSelect.classList.remove('hide');
      state.pokemons.forEach((pokemon) => {
        const option = document.createElement('option');
        option.textContent = pokemon.name;
        option.value = pokemon.url;
        dom.pokemonsSelect.appendChild(option);
      });
      dom.getButton.classList.add('hide');
    }

    if (state.pokemon) {
      dom.imgContainer.innerHTML = String.raw`
        <div class="content-container flex-column whiteframe">
          <img id="pokemon-img"
            height="320"
            src="${state.pokemon.sprites.other.home.front_default}" 
            alt="${state.pokemon.name}">
        </div>`;
    }
  };

  return { root, update };
}

export default createPokemonsView;
