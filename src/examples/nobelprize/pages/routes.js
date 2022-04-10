import createLaureatePage from './laureatePage.js';
import createPrizesPage from './prizesPage.js';
import createHomePage from './homePage.js';

const routes = [
  { path: 'nb-home', page: createHomePage },
  { path: 'nb-prizes', page: createPrizesPage },
  { path: 'nb-laureate', page: createLaureatePage },
];

export default routes;
