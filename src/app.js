import loadPage from './lib/pageLoader.js';
import createHomePage from './pages/homePage.js';

function loadApp() {
  loadPage(createHomePage);
}

export default loadApp;
