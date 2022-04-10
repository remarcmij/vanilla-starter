function createIntroPage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>GitHub App 2</h1>
    <p>This example fetches and render data from the GitHub API and illustrates the following:</p>
    <ul>
      <li>Navigate between pages using the client-side router.</li>
      <li>Subscribe to observable state using the router's lifecycle methods.</li>
      <li>State changes are logged to the console through the logger.</li>
      <li>Keep navigation state in the browser URL.</li>
    </ul>
    <a href="#gh-repos">Go to Example</a>
    <a href="#home">Back to Home Page</a>
  `;
  return { root };
}

export default createIntroPage;
