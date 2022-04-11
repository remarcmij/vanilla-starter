import state$ from '../state.js';

function createErrorPage() {
  const { error } = state$.get();

  const root = document.createElement('div');
  root.className = 'dialog-container whiteframe';
  root.innerHTML = String.raw`
    <h4>Oops... Something went wrong</h4>
    <div>
      ${error?.message || 'Unknown error'}
    </div>
    <a href="#gh-repos">Home</button>
  `;

  return { root };
}

export default createErrorPage;
