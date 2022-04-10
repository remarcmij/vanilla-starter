/**
 * Inspired by: https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak
 */

function createIntroPage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Stopwatch Example</h1>
    <p>This example illustrates the following:</p>
    <ul>
      <li>Managing state using a local <code>state</code> object.</li>
      <li>Perform cleanup: clearing a timer on page unload.</li>
    </ul>
    <a href="#st-stopwatch">Go to Example</a>
    <a href="#home">Back to Home Page</a>
  `;
  return { root };
}

export default createIntroPage;
