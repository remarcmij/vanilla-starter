import createHomePage from './examples/pokemon/pages/homePage.js';
import loadPage from './lib/loadPage.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');

  const pageRoot = document.createElement('div');
  pageRoot.id = 'page-root';
  appRoot.appendChild(pageRoot);

  loadPage(createHomePage);
}

export default loadApp;
