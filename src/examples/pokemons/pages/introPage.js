function createIntroPage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Pokemon Example</h1>
    <p>This example illustrates the following:</p>
    <ul>
      <li>Fetching data from a Web API.</li>
      <li>Managing state with a local state object.</li>
      <li>No library (lib) functions are used.</li>
    </ul>
    <a href="#po-pokemons">Go to Example</a>
    <a href="#home">Back to Home Page</a>
    `;

  return { root };
}

export default createIntroPage;
