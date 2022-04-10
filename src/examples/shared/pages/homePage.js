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
          <a href="#gh-intro">GitHub Repositories App</a>
        </li>
        <li>
          <a href="#nb-intro">Nobel Prize App</a>
        </li>
        <li>
          <a href="#st-intro">Stopwatch App</a>
        </li>
        <li>
          <a href="#po-intro">Pokemons App</a>
        </li>    
      <ul>
    </div>`;

  return { root };
}

export default createHomePage;
