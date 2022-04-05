import loadPage from '../../../lib/loadPage.js';
import createAboutView from '../views/aboutView.js';
import createHomePage from './homePage.js';

function createAboutPage() {
  const onHomeClick = () => loadPage(createHomePage);
  return createAboutView({ onHomeClick });
}

export default createAboutPage;
