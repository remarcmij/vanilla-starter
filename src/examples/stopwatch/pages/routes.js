import createStopwatchPage from './stopwatchPage.js';
import createHomePage from './homePage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'stopwatch', page: createStopwatchPage },
];

export default routes;
