import loadPage from '../../../lib/loadPage.js';
import createErrorView from '../views/errorView.js';
import createReposPage from './reposPage.js';
import state from './state.js';

function createErrorPage() {
  const { error } = state;

  const onClick = () => {
    state.error = null;
    loadPage(createReposPage);
  };

  const props = { error, onClick };
  return createErrorView(props);
}

export default createErrorPage;
