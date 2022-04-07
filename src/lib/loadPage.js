import log from './logger.js';

function loadPage(createPageFn, props = {}) {
  log.debug('loadPage', createPageFn.name);
  const page = createPageFn(props);
  const pageRoot = document.getElementById('page-root');
  pageRoot.innerHTML = '';
  pageRoot.appendChild(page.root);
}

export default loadPage;
