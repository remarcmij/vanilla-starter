/**
 * Loads a page into the page container.
 * @param {() => void} createPageFn Page function
 */
function loadPage(createPageFn) {
  const page = createPageFn();

  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = '';
  appRoot.appendChild(page.root);

  // Reset scroll position to top of page
  window.scrollTo(0, 0);
}

export default loadPage;
