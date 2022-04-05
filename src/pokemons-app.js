import createPokemonsPage from './examples/pokemon/pages/pokemonsPage.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');

  const pokemonsPage = createPokemonsPage();
  appRoot.appendChild(pokemonsPage.root);
}

export default loadApp;
