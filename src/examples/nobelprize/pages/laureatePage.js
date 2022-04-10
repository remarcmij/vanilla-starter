import router from '../../../lib/router.js';
import fetchLaureate from '../fetchers/laureateFetcher.js';
import state$ from '../state.js';
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

  const pageDidLoad = () => {
    state$.subscribe(laureateView.update);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(laureateView.update);
  };

  return { ...laureateView, pageDidLoad, pageWillUnload };
}

export default createLaureatePage;
