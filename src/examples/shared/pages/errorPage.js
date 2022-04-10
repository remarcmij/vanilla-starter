function createErrorPage() {
  const root = document.createElement('div');
  root.className = 'dialog-container whiteframe';
  root.innerHTML = String.raw`
    <h4>Oops... Something went wrong</h4>
    <a href="#home">Home</button>
  `;

  return { root };
}

export default createErrorPage;
