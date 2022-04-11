import createHomeView from '../views/homeView.js';

function createHomePage() {
  const props = { text: 'Hello world!' };
  return createHomeView(props);
}

export default createHomePage;
