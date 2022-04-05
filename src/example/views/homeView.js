function createHomeView() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <h1>Router Starter Application</h1>
    <p>Features a hash-based router written in plain vanilla JavaScript. 
      This example uses the GitHub API to lists repositories from the 
      HackYourFuture organization.
    </p>
    <p>Open the developer console to view debug log messages produced by
      app.
    </p>
    <div class="button-container">
      <a href="#repos">Start</a>
      <a href="#about">About</a>
    </div>
  `;

  return { root };
}

export default createHomeView;
