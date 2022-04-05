import createHomeView from '../views/homeView.js';

function createHomePage() {
  const props = { text: 'It works!' };
  return createHomeView(props);
}

export default createHomePage;
