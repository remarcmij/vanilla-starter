function loadPage(createPageFn, ...args) {
  const page = createPageFn(...args);
  const pageRoot = document.getElementById('page-root');
  pageRoot.innerHTML = '';
  pageRoot.appendChild(page.root);
}

export default loadPage;
