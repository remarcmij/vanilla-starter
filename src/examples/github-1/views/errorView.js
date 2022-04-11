function createErrorView(state) {
  const root = document.createElement('div');
  root.className = 'dialog-container whiteframe';
  root.innerHTML = String.raw`
    <h4>Oops... Something went wrong</h4>
    <div>
      ${state.error?.message || 'Unknown error'}
    </div>
    <button type="button">Home</button>
  `;

  const homeButton = root.querySelector('button');
  homeButton.addEventListener('click', state.onClick);

  return { root };
}

export default createErrorView;
