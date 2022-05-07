import router from '../../../lib/router.js';
import createFloatingButtonView from '../views/floatingButtonView.js';

function createFloatingButtonComponent() {
  const onClick = () => router.navigateTo('menu');
  const { root } = createFloatingButtonView({ onClick });

  const onHashChange = () => {
    if (window.location.hash === '#menu') {
      root.classList.add('hide');
    } else {
      root.classList.remove('hide');
    }
  };

  onHashChange();
  window.addEventListener('hashchange', onHashChange);

  return { root };
}

export default createFloatingButtonComponent;
