import createHomeView from '../views/homeView.js';
import loadPage from '../../../lib/loadPage.js';
import aboutPage from '../pages/aboutPage.js';
import reposPage from '../pages/reposPage.js';

function createHomePage(state) {
  const onAboutClick = () => loadPage(aboutPage, state);
  const onStartClick = () => loadPage(reposPage, state);
  return createHomeView({onAboutClick, onStartClick});
}

export default createHomePage;
