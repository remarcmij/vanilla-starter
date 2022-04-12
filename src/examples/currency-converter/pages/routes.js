import createLandingPage from './landingPage.js';
import createMainPage from './mainPage.js';

const routes = [
  { path: 'ex-home', page: createLandingPage, default: true },
  { path: 'ex-convert', page: createMainPage },
];

export default routes;
