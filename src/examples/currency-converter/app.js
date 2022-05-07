import createConverterPage from './pages/converterPage.js';

function loadApp() {
  const appRoot = document.getElementById('app-root');
  const page = createConverterPage();
  appRoot.appendChild(page.root);
}

export default loadApp;
