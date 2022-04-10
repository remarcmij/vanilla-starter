import loadPokemonApp from '../../pokemons/app.js';
import loadGitHubApp from '../../github-1/app.js';

function createHomePage() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Vanilla Starter Example Applications</h3>
      </div>
    </header>
    <div class="content-container whiteframe" >
      <table style="width:100%">
        <thead>
          <tr>
            <th>Example</th>
            <th>Features used</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pokemon App*</td>
            <td>no router, local state, no logger</td>
            <td><a href="#" id="pokemonLink">Start Pokemon App</a></td>
          </tr>
          <tr>
            <td>Stopwatch App</td>
            <td>router, local state, logger</td>
            <td><a href="#st-intro">Start Stopwatch App</a></td>
          </tr>
          <tr>
            <td>GitHub App 1*</td>
            <td>no router, local state, logger</td>
            <td><a href="#" id="githubLink">Start GitHub App 1</a></td>
          </tr>
          <tr>
            <td>GitHub App 2</td>
            <td>router, observable state, logger</td>
            <td><a href="#gh-intro">Start GitHub App 2</a></td>
          </tr>
          <tr>
            <td>Nobel Prize App</td>
            <td>router, observable state, logger</td>
            <td><a href="#nb-intro">Start Nobel Prize App</a></td>
          </tr>
        </tbody>
      </table>
      <p>*<small>To return to this page from the indicated applications, use the browser reload button.</small></p>
    <div>
    </div>`;

  root.querySelector('#pokemonLink').addEventListener('click', (e) => {
    e.preventDefault();
    loadPokemonApp();
  });

  root.querySelector('#githubLink').addEventListener('click', (e) => {
    e.preventDefault();
    loadGitHubApp();
  });

  return { root };
}

export default createHomePage;
