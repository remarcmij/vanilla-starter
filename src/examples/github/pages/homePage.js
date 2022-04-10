function createHomePage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Router Example</h1>
    <p>This example illustrate the client-side router.</p>
    <p>It renders information fetched from the GitHub API.</p>
    <a href="#gh-repos">Go to Example</a>
  `;
  return { root };
}

export default createHomePage;
