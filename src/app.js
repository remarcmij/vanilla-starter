import createHomePage from './pages/homePage.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');

  const { root } = createHomePage();
  appRoot.appendChild(root);
}

export default loadApp;
