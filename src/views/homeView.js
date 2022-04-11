function createHomeView(props) {
  const root = document.createElement('div');
  root.className = 'dialog-container';
  root.innerHTML = String.raw`
    <h1>Home Page</h1>
    <h2>${props.text}</h2>
    <a href="#about">Go to About Page</a>
  `;

  return { root };
}

export default createHomeView;
