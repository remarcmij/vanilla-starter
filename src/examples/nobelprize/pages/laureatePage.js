import state$ from '../../../lib/observableState.js';
import router from '../../../lib/router.js';
import fetchLaureate from '../fetchers/laureateFetcher.js';
import createLaureateView from '../views/laureateView.js';

function createLaureatePage(id, awardYear) {
  const getData = async () => {
    state$.update({
      error: null,
      loading: true,
      laureate: null,
    });

    try {
      const data = await fetchLaureate(id);
      state$.update({ laureate: data[0], loading: false });
    } catch (error) {
      console.error(error.stack); // TODO: remove from production
      state$.update({ error, loading: false });
      router.navigateTo('error');
      return;
    }
  };

  getData();

  const { category, year, page } = state$.get();
  const viewProps = { category, year, page, awardYear };
  const laureateView = createLaureateView(viewProps);

  const pageDidMount = () => {
    state$.subscribe(laureateView.update);
  };

  const pageWillUnmount = () => {
    state$.unsubscribe(laureateView.update);
  };

  return { ...laureateView, pageDidMount, pageWillUnmount };
}

export default createLaureatePage;
