import createPokemonsPage from './pages/pokemonsPage.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = '';

  const page = createPokemonsPage();
  appRoot.appendChild(page.root);
}

export default loadApp;
