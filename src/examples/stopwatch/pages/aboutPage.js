function createAboutPage() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>About Stopwatch</h3>
        <span class="spanner"></span>
        <p><a href="#stopwatch">Back</a></p>
      </div>
    </header>
    <div class="content-container whiteframe">
      <p>Adding this About page makes the Stopwatch example a multi-page app. This was
        done on purpose to demonstrate how to clean up a running interval timer in the main
        page when it is about to be unloaded. Cleanup is done inside the <code>pageWillUnload()</code>
        lifecycle method of the main page.</p>

        <p>Check the browser console output and observe how a running timer is cleared when
          navigating away from the main page.
        </p>
    </div>
   
  `;
  return { root };
}

export default createAboutPage;
