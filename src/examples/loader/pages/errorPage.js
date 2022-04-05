import pageLoader from '../../../lib/pageLoader.js';
import createErrorView from '../views/errorView.js';
import createReposPage from './reposPage.js';

function createErrorPage() {
  const { error } = pageLoader.getState();
  const onClick = () => {
    pageLoader.updateState({ error: null });
    pageLoader.loadPage(createReposPage);
  };

  const props = { error, onClick };
  return createErrorView(props);
}

export default createErrorPage;
