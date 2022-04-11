import loadPage from '../../../lib/pageLoader.js';
import createReposPage from './reposPage.js';

function createIntroPage(state) {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>GitHub App 1</h1>
    <p>This example fetches and render data from the GitHub API and illustrates the following.</p>
    <ul>
      <li>Navigate between pages without using a router.</li>
      <li>A global state object is passed along on page changes.</li>
      <li>State changes are logged to the console through the logger.</li>
    </ul>
    <a href="#" id="link">Go to Example</a>
  `;

  root.querySelector('#link').addEventListener('click', (e) => {
    e.preventDefault();
    loadPage(createReposPage, state);
  });
  return { root };
}

export default createIntroPage;
