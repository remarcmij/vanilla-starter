import createErrorPage from './errorPage.js';
import createLaureatePage from './laureatePage.js';
import createPrizesPage from './prizesPage.js';

const routes = [
  { path: 'prizes', page: createPrizesPage, default: true },
  { path: 'laureate', page: createLaureatePage },
  { path: 'error', page: createErrorPage },
];

export default routes;
