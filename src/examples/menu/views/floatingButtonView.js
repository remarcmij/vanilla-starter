// credit: https://codepen.io/androidcss/pen/yOopGp

function createFloatingButtonView(props) {
  const root = document.createElement('div');
  root.className = 'hide';
  root.innerHTML = String.raw`
    <a href="#menu" class="floating-button">
      <i class="${props.faClass} fa-lg"></i>
    </a>
  `;

  return { root };
}

export default createFloatingButtonView;
