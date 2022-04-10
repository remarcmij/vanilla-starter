import createStopwatchPage from './stopwatchPage.js';
import createIntroPage from './introPage.js';

const routes = [
  { path: 'st-intro', page: createIntroPage },
  { path: 'st-stopwatch', page: createStopwatchPage },
];

export default routes;
