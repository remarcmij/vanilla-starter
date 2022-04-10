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
      <li>Navigate between pages using the client-side router.</li>
      <li>Managing state with a local state object.</li>
      <li>State changes are logged to the console through the logger.</li>
      <li>Perform cleanup on page unload: clearing a timer.</li>
    </ul>
    <a href="#st-stopwatch">Go to Example</a>
    <a href="#home">Back to Home Page</a>
  `;
  return { root };
}

export default createIntroPage;
