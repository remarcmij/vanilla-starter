import loadPage from '../../../lib/loadPage.js';
import createPokemonsPage from './pokemonsPage.js';

function createHomePage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Pokemon Example</h1>
    <p>This example illustrates fetching data from a Web API.</p>
    <button type="button" id=btn>Go to Example</button>
  `;

  root
    .querySelector('#btn')
    .addEventListener('click', () =>
      loadPage(createPokemonsPage, { title: 'Pokemons!' })
    );

  return { root };
}

export default createHomePage;
