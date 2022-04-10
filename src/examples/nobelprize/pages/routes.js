import createLaureatePage from './laureatePage.js';
import createPrizesPage from './prizesPage.js';
import createIntroPage from './introPage.js';

const routes = [
  { path: 'nb-intro', page: createIntroPage },
  { path: 'nb-prizes', page: createPrizesPage },
  { path: 'nb-laureate', page: createLaureatePage },
];

export default routes;
