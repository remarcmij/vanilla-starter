function loadPage(createPageFn, state) {
  const page = createPageFn(state);

  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = '';
  appRoot.appendChild(page.root);

  // Reset scroll position to top of page
  window.scrollTo(0, 0);
}

export default loadPage;
