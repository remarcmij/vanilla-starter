function createIntroPage() {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Nobel Prize Example</h1>
    <p>This example fetches data from the
       <a href="https://nobelprize.readme.io/" target="_blank">Nobel Prize API</a> 
       and illustrates the following:
    </p>
    <ul>
      <li>Manage state through observable state.</li>
      <li>Keep partial state in the browser URL.</li>
    </ul>
    <a href="#nb-prizes">Go to Example</a>
    <a href="#home">Back to Home Page</a>
  `;
  return { root };
}

export default createIntroPage;
