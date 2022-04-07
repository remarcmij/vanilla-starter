function createHomePage(props) {
  const root = document.createElement('div');
  root.className = 'flex-column';
  root.innerHTML = String.raw`
    <h1>Pokemon Example</h1>
    <p>This example illustrates fetching data from a Web API.</p>
    <button type="button" id=btn>Go to Example</button>
  `;

  root.querySelector('#btn').addEventListener('click', props.onClick);

  return { root };
}

export default createHomePage;
