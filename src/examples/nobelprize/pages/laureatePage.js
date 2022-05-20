import router from '../../../lib/router.js';
import fetchLaureate from '../fetchers/laureateFetcher.js';
import state$ from '../state.js';
import createLaureateView from '../views/laureateView.js';

function createLaureatePage(props) {
  const [id, awardYear] = props.params;
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
      router.navigateTo('nb-error');
      return;
    }
  };

  getData();

  const { category, year, page } = state$.get();
  const viewProps = { category, year, page, awardYear };
  const view = createLaureateView(viewProps);

  const pageDidLoad = () => {
    state$.subscribe(view);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(view.update);
  };

  return { ...view, pageDidLoad, pageWillUnload };
}

export default createLaureatePage;
