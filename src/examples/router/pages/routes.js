import createErrorPage from './errorPage.js';
import createRepoDetailPage from './repoDetailPage.js';
import createReposPage from './reposPage.js';

const routes = [
  { path: 'repos', page: createReposPage, default: true },
  { path: 'repo', page: createRepoDetailPage },
  { path: 'error', page: createErrorPage },
];

export default routes;
