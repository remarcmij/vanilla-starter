import createStopwatchPage from './stopwatchPage.js';
import createIntroPage from './introPage.js';

const routes = [
  { path: 'st-stopwatch', page: createStopwatchPage, default: true },
  { path: 'st-intro', page: createIntroPage },
];

export default routes;
