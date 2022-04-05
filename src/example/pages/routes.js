//@ts-check
import createAboutPage from './aboutPage.js';
import createErrorPage from './errorPage.js';
import createHomePage from './homePage.js';
import createRepoDetailPage from './repoDetailPage.js';
import createReposPage from './reposPage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'about', page: createAboutPage },
  { path: 'repos', page: createReposPage },
  { path: 'repo', page: createRepoDetailPage },
  { path: 'error', page: createErrorPage },
];

export default routes;
