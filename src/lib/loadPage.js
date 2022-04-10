import log from './logger.js';

function loadPage(createPageFn, ...params) {
  log.debug('loadPage', createPageFn.name);
  const page = createPageFn(...params);
  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = '';
  appRoot.appendChild(page.root);
}

export default loadPage;
