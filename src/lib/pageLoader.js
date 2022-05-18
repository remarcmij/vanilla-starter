/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */
function pageLoader() {
  let currentPage = {};

  return (createPageFn) => {
    // Call optional pageWillUnload lifecycle method.
    currentPage.pageWillUnload?.();

    // Create the new page.
    currentPage = createPageFn();

    // Mount the new page, replacing any previous page.
    const appRoot = document.getElementById('app-root');
    appRoot.innerHTML = '';
    appRoot.appendChild(currentPage.root);

    // Reset scroll position to top of page
    window.scrollTo(0, 0);

    // Call optional pagDidLoad lifecycle method.
    currentPage.pagDidLoad?.();
  };
}

export default pageLoader();
