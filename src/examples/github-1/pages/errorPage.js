import loadPage from '../../../lib/loadPage.js';
import createErrorView from '../views/errorView.js';
import createReposPage from './reposPage.js';

function createErrorPage(state) {
  const onClick = () => {
    state = { ...state, error: null };
    loadPage(createReposPage, state);
  };

  const props = { error: state.error, onClick };
  return createErrorView(props);
}

export default createErrorPage;
