/**
 * Inspired by: https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak
 */

function createHomePage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Stopwatch Example</h1>
    <p>This example illustrate observable state and router lifecycle methods.</p>
    <a href="#stopwatch">Go to Example</a>
  `;
  return { root };
}

export default createHomePage;
