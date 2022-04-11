import log from './logger.js';

function pageLoader() {
  let currentPage = {};

  return function loadPage(createPageFn, state) {
    // Call optional willUnmount lifecycle method on the page to be unloaded.
    if (currentPage.pageWillUnload) {
      log.silly('router', 'calling pageWillUnload()');
      currentPage.pageWillUnload();
    }

    log.debug('loader', `page: ${createPageFn.name}, state:`, state);

    const newPage = createPageFn(state);
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = '';
    appRoot.appendChild(newPage.root);

    // Reset scroll position to top of page
    window.scrollTo(0, 0);

    // Call optional didMount lifecycle method on the new page.
    if (newPage.pageDidLoad) {
      log.silly('router', 'calling pageDidLoad()');
      newPage.pageDidLoad();
    }

    currentPage = newPage;
  };
}

export default pageLoader();
