function createHomePage() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Vanilla Starter Example Applications</h3>
      </div>
    </header>
    <div class="content-container whiteframe">
      <ul class="list-no-bullets">
        <li>
          <a href="#gh-home">GitHub Repositories App</a>
        </li>
        <li>
          <a href="#nb-home">Nobel Prize App</a>
        </li>
        <li>
          <a href="#st-home">Stopwatch App</a>
        </li>
        <li>
          <a href="#po-home">Pokemons App</a>
        </li>    
      <ul>
    </div>`;

  return { root };
}

export default createHomePage;
