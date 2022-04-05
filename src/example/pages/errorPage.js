import router from '../../lib/router.js';
import createErrorView from '../views/errorView.js';

function createErrorPage() {
  const { error } = router.getState();
  const props = {
    error,
    onClick: () => {
      router.updateState({ error: null });
      router.navigateTo('home');
    },
  };
  return createErrorView(props);
}

export default createErrorPage;
