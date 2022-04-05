import loadPage from '../../../lib/loadPage.js';
import createErrorView from '../views/errorView.js';
import createHomePage from './homePage.js';
import state from './state.js';

function createErrorPage() {
  const { error } = state;

  const onClick = () => {
    state.error = null;
    loadPage(createHomePage);
  };

  const props = { error, onClick };
  return createErrorView(props);
}

export default createErrorPage;
