function createHomePage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Nobel Prize Example</h1>
    <p>This example illustrate....</p>
    <a href="#nb-prizes">Go to Example</a>
  `;
  return { root };
}

export default createHomePage;
