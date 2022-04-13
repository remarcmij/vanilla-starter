const routes = [
  { path: 'nb-prizes', page: () => import('./prizesPage.js'), default: true },
  { path: 'nb-laureate', page: () => import('./laureatePage.js') },
  { path: 'nb-error', page: () => import('./errorPage.js') },
  { path: 'nb-intro', page: () => import('./introPage.js') },
];

export default routes;
