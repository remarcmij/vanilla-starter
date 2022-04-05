function createErrorView(props) {
  const root = document.createElement('div');
  root.className = 'dialog-container whiteframe';
  root.innerHTML = String.raw`
    <h4>Oops... Something went wrong</h4>
    <div>
      ${props.error?.message ?? ''}
    </div>
    <button type="button">Home</button>
  `;

  const homeButton = root.querySelector('button');
  homeButton.addEventListener('click', props.onClick);

  return { root };
}

export default createErrorView;
