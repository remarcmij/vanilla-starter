import createErrorPage from './errorPage.js';
import createIntroPage from './introPage.js';
import createLaureatePage from './laureatePage.js';
import createPrizesPage from './prizesPage.js';

const routes = [
  { path: 'nb-intro', page: createIntroPage },
  { path: 'nb-prizes', page: createPrizesPage },
  { path: 'nb-laureate', page: createLaureatePage },
  { path: 'nb-error', page: createErrorPage },
];

export default routes;
