import createHomePage from './homePage.js';
import createAboutPage from './aboutPage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'about', page: createAboutPage },
];

export default routes;
