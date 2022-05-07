/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

import logger from './logger.js';

function navigateTo(path, ...params) {
  // Example:
  // navigateTo('repos', 'HackYourFuture', 'my-repo') => '#repos/HackYourFuture/my-repo'
  logger.silly('navigateTo', 'path:', path, 'params:', [...params]);
  const encodedHash = encodeURI('#' + [path, ...params].join('/'));
  window.location.assign(encodedHash);
}

function getRouteParts() {
  // Example:
  // '#repos/HackYourFuture/my-repo' => ['repos', 'HackYourFuture', 'my-repo']
  const [hash, ...rest] = decodeURI(window.location.hash).split('/');
  const path = hash.replace('#', '');
  return [path, ...rest];
}

function getDefaultRoute(routes) {
  const defaultRoute = routes.find((route) => route.default);
  if (!defaultRoute) {
    throw new Error('Missing default route in routes table');
  }
  return defaultRoute;
}

function findRouteByPathname(routes, pathname) {
  return routes.find((route) => route.path === pathname);
}

async function onHashChange(routerState) {
  const { routes, pageRoot, currentPage } = routerState;

  const [pathname, ...params] = getRouteParts();

  // Find the page corresponding to the current hash value
  const route = findRouteByPathname(routes, pathname);

  // If not found, redirect to default page
  if (!route) {
    navigateTo(getDefaultRoute(routes).path);
    return;
  }

  // Call optional willUnmount lifecycle method.
  if (currentPage.pageWillUnload) {
    logger.silly('router', 'calling pageWillUnload()');
    currentPage.pageWillUnload();
  }

  logger.debug('router', `loading page: ${pathname}, params: ${[...params]}`);

  // Create the page corresponding to the route.
  let newPage = route.page({ params });
  if (typeof newPage !== 'object') {
    throw new Error(`Page ${pathname} did not return an object`);
  }

  // If the page is a promise then await it (dynamic import)
  // await it (dynamic import).
  if (newPage instanceof Promise) {
    const module = await newPage;
    const pageFn = module.default;
    newPage = pageFn({ params });
  }

  if (typeof newPage !== 'object' || !newPage.root) {
    throw new Error(`Page "${pathname}" did not return a valid page object`);
  }

  // Clear the content of the pageRoot container and append the page
  // root element as its new child.
  pageRoot.innerHTML = '';
  pageRoot.appendChild(newPage.root);

  // Reset scroll position to top of page
  window.scrollTo(0, 0);

  // Call optional didMount lifecycle method.
  if (newPage.pageDidLoad) {
    logger.silly('router', 'calling pageDidLoad()');
    newPage.pageDidLoad();
  }

  routerState.currentPage = newPage;
}

function logRoutesTable(routes) {
  if (logger.isMinLevel('debug')) {
    // Log the routes table to the console
    console.log('Routes Table:');
    const displayRoutes = routes.map((route) => ({
      ...route,
      page: route.page.name,
    }));
    console.table(displayRoutes);
  }
}

function createRouter() {
  let routerState;

  const start = (routes, pageRoot) => {
    logRoutesTable(routes);

    routerState = {
      routes,
      pageRoot,
      currentPage: {},
    };

    window.addEventListener('hashchange', () => onHashChange(routerState));

    // Kick-start the router
    onHashChange(routerState);
  };

  return { start, navigateTo };
}

export default createRouter();
