import loadPage from '../../../lib/loadPage.js';
import createReposPage from './reposPage.js';

function createHomePage(state) {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Base Example</h1>
    <p>This example illustrate an app that uses a simple 
        <strong>loadPage()</strong> function instead of the router.</p>
    <p>It renders information fetched from the GitHub API.</p>
    <button type="button" id="btn">Go to Example</button>
  `;

  root
    .querySelector('#btn')
    .addEventListener('click', () => loadPage(createReposPage, state));

  return { root };
}

export default createHomePage;
