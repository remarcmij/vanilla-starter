import createErrorPage from './errorPage.js';
import createIntroPage from './introPage.js';
import createRepoDetailPage from './repoDetailPage.js';
import createReposPage from './reposPage.js';

const routes = [
  { path: 'gh-intro', page: createIntroPage },
  { path: 'gh-repos', page: createReposPage },
  { path: 'gh-repo', page: createRepoDetailPage },
  { path: 'gh-error', page: createErrorPage },
];

export default routes;
