function createHomePage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Pokemon Example</h1>
    <p>This example illustrates fetching data from a Web API.</p>
    <a href="#pokemons">Go to Example</button>
  `;

  return { root };
}

export default createHomePage;
