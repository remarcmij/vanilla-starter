const routes = [
  { path: 'nb-prizes', page: () => import('./prizesPage.js'), default: true },
  { path: 'nb-laureate', page: () => import('./laureatePage.js') },
  { path: 'nb-error', page: () => import('./errorPage.js') },
];

export default routes;
