function aboutView() {
  const root = document.createElement('div');
  root.className = 'dialog-container';
  root.innerHTML = String.raw`
    <h1>About Page</h1>
    <a href="#home">Return to Home Page</a>
  `;

  return { root };
}

export default aboutView;
