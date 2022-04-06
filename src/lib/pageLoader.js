import log from './logger.js';
import createObservableState from './observableState.js';

const observableState = createObservableState();

function updateState(updates) {
  const newState = observableState.updateState(updates);
  log.debug('state', newState);
  return newState;
}

function getState() {
  return observableState.getState();
}

function pageLoader() {
  let currentPage = null;
  let _pageRoot = null;

  const load = (createPageFn, ...args) => {
    log.debug('loading page', `${createPageFn.name}, params: ${[...args]}`);

    if (typeof currentPage?.update === 'function') {
      // Unsubscribe the current page from the state observable.
      observableState.unsubscribe(currentPage.update);
    }

    // Create the new page
    currentPage = createPageFn(...args);

    if (typeof currentPage.update === 'function') {
      // Subscribe the new page to the state observable.
      observableState.subscribe(currentPage.update);
    }

    // Mount the new page into the DOM, replacing any existing page
    _pageRoot.innerHTML = '';
    _pageRoot.appendChild(currentPage.root);
  };

  const initialize = (pageRoot, initialState = {}) => {
    _pageRoot = pageRoot;
    observableState.updateState(initialState);
  };

  return { load, initialize, updateState, getState };
}

export default pageLoader();
