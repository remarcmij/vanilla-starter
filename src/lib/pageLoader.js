import log from './logger.js';
import createObservableState from './observableState.js';

function pageLoader() {
  const obsState = createObservableState();
  let currentPage = null;
  let _pageRoot = null;

  const load = (createPageFn, ...args) => {
    log.debug('loading page', `${createPageFn.name}, params: ${[...args]}`);

    if (typeof currentPage?.update === 'function') {
      // Unsubscribe the current page from the state observable.
      obsState.unsubscribe(currentPage.update);
    }

    // Create the new page
    currentPage = createPageFn(...args);

    if (typeof currentPage.update === 'function') {
      // Subscribe the new page to the state observable.
      obsState.subscribe(currentPage.update);
    }

    // Mount the new page into the DOM, replacing any existing page
    _pageRoot.innerHTML = '';
    _pageRoot.appendChild(currentPage.root);
  };

  const initialize = (pageRoot, state = {}) => {
    _pageRoot = pageRoot;
    const newState = obsState.updateState(state);
    log.debug('state', newState);
  };

  const { updateState, getState } = obsState;

  return { load, initialize, updateState, getState };
}

export default pageLoader();
