const routes = [
  { path: 'nb-intro', page: () => import('./introPage.js') },
  { path: 'nb-prizes', page: () => import('./prizesPage.js') },
  { path: 'nb-laureate', page: () => import('./laureatePage.js') },
  { path: 'nb-error', page: () => import('./errorPage.js') },
];

export default routes;
