//@ts-check
/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

import log from './logger.js';
import createObservableState from './observableState.js';

/**
 * Navigates to a specified page.
 * @param {string} path The name of the page to load.
 * @param {*} params Parameters to be passed to the Page function.
 */
const navigateTo = (path, ...params) => {
  log.silly('navigateTo', 'path:', path, 'params:', [...params]);
  const encodedHash = encodeURI('#' + [path, ...params].join('/'));
  window.location.assign(encodedHash);
};

const getRouteParts = () => {
  const [hash, ...rest] = decodeURI(window.location.hash).split('/');
  const path = hash.replace('#', '');
  return [path, ...rest];
};

/**
 * Create a location hash based router.
 */
function createRouter() {
  let _routes = null;
  let _routerOutlet = null;
  const _obsState = createObservableState();

  /** @type {object | null} */
  let _currentPage = null;

  // Find the first route object in the `routes` table that has the property
  // `default` set to `true` (or thruthy). This is the default route.
  const getDefaultRoute = () => {
    const defaultRoute = _routes.find((route) => route.default);
    if (!defaultRoute) {
      throw new Error('Missing default route in routes table');
    }
    return defaultRoute;
  };

  const findRouteByPathname = (pathname) =>
    _routes.find((route) => route.path === pathname);

  // Routes are encoded in the hash part of the document location.
  // We listen for changes to the hash and attempt to load a corresponding
  // page from the `routes` table.
  window.addEventListener('hashchange', () => {
    const [pathname, ...params] = getRouteParts();

    // Find the page corresponding to the current hash value
    const route = findRouteByPathname(pathname);

    // If not found, redirect to default page
    if (!route) {
      navigateTo(getDefaultRoute().path);
      return;
    }

    // Create the page corresponding to the route.
    // The page creation function is expected to return its root element
    // in the root property of the returned object.
    log.debug('router', `loading page: ${pathname}, params: ${[...params]}`);

    if (typeof _currentPage?.update === 'function') {
      // Unsubscribe the current page from the state observable.
      _obsState.unsubscribe(_currentPage.update);
    }

    _currentPage = route.page(...params);

    if (typeof _currentPage?.update === 'function') {
      // Subscribe the new page to the state observable.
      _obsState.subscribe(_currentPage.update);
    }

    // Clear the content router outlet container and append the page
    // root element as its new child.
    _routerOutlet.innerHTML = '';
    _routerOutlet.appendChild(_currentPage.root);
  }); // end of event handler

  /** @typedef {(state: object) => void} UpdateCallback*/
  /** @typedef {{root: HTMLElement, update?: UpdateCallback}} ViewObject*/
  /** @typedef {(...params: string[]) => ViewObject} PageFunction */
  /** @typedef {{path: string, page: PageFunction, default?: boolean}} Route */

  /**
   * Start the router.
   * @param {Route[]} routes A router table array.
   * @param {HTMLElement} routerOutlet The DOM element where pages should be loaded.
   * @param {object} state The initial global app state.
   */
  const start = (routes, routerOutlet, state = {}) => {
    _routes = routes;
    _routerOutlet = routerOutlet;
    _obsState.updateState(state);

    if (log.isMinLevel('debug')) {
      // Log the routes table to the console
      console.log('Routes Table:');
      const displayRoutes = routes.map((route) => ({
        ...route,
        page: route.page.name,
      }));
      console.table(displayRoutes);
    }

    // Kick-start the router
    window.dispatchEvent(new Event('hashchange'));
  };

  /**
   * Update the state.
   * @param {object} updates Update to be made.
   */
  const updateState = (updates) => {
    const newState = _obsState.updateState(updates);
    log.debug('state', newState);
  };

  const { getState } = _obsState;

  return { start, navigateTo, updateState, getState };
}

const router = createRouter();
export default router;
