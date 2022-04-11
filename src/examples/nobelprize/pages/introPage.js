function createIntroPage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Nobel Prize App</h1>
    <p>This example fetches data from the
       <a href="https://nobelprize.readme.io/" target="_blank">Nobel Prize API</a> 
       and illustrates the following:
    </p>
    <ul>
      <li>Navigate between pages using the client-side router.</li>
      <li>Subscribe to observable state using the router's lifecycle methods.</li>
      <li>State changes are logged to the console through the logger.</li>
      <li>Keep navigation state in the browser URL.</li>
      <li>Routes that use dynamics imports (advanced feature).</li>
    </ul>
    <a href="#nb-prizes">Go to Example</a>
    <a href="#home">Back to Home Page</a>
  `;
  return { root };
}

export default createIntroPage;
