function createFloatingButtonView(props) {
  const root = document.createElement('div');
  root.className = 'floating-button hide';
  root.innerHTML = String.raw`
    <button type="button" id="floatingButton">Return to Examples Menu</button>
  `;

  const floatingButton = root.querySelector('#floatingButton');
  floatingButton.addEventListener('click', props.onClick);

  return { root };
}

export default createFloatingButtonView;
