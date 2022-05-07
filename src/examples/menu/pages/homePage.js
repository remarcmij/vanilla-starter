import createHomeView from '../views/homeView.js';

function createHomePage() {
  const view = createHomeView();
  return { root: view.root };
}

export default createHomePage;
