import createStopwatchPage from './stopwatchPage.js';
import createHomePage from './homePage.js';

const routes = [
  { path: 'st-home', page: createHomePage },
  { path: 'st-stopwatch', page: createStopwatchPage },
];

export default routes;
