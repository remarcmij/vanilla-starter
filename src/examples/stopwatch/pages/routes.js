import createStopwatchPage from './stopwatchPage.js';
import createAboutPage from './aboutPage.js';

const routes = [
  { path: 'stopwatch', page: createStopwatchPage, default: true },
  { path: 'about-stopwatch', page: createAboutPage },
];

export default routes;
