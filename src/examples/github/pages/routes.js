import createErrorPage from './errorPage.js';
import createRepoDetailPage from './repoDetailPage.js';
import createReposPage from './reposPage.js';

const routes = [
  { path: 'gh-repos', page: createReposPage, default: true },
  { path: 'gh-repo', page: createRepoDetailPage },
  { path: 'gh-error', page: createErrorPage },
];

export default routes;
