import createHomePage from './homePage.js';
import createRepoDetailPage from './repoDetailPage.js';
import createReposPage from './reposPage.js';

const routes = [
  { path: 'gh-home', page: createHomePage },
  { path: 'gh-repos', page: createReposPage },
  { path: 'gh-repo', page: createRepoDetailPage },
];

export default routes;
