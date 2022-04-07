import loadPage from '../../../lib/loadPage.js';
import createPokemonsPage from './pokemonsPage.js';
import createHomeView from '../views/homeView.js';

function createHomePage() {
  const onClick = () => loadPage(createPokemonsPage);
  return createHomeView({ onClick });
}

export default createHomePage;
