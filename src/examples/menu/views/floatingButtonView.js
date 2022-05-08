// credit: https://codepen.io/androidcss/pen/yOopGp

function createFloatingButtonView() {
  const root = document.createElement('div');
  root.className = 'hide';
  root.innerHTML = String.raw`
    <a href="#menu" class="floating-button">
      <i class="fa fa-home my-float"></i>
    </a>
  `;

  return { root };
}

export default createFloatingButtonView;
