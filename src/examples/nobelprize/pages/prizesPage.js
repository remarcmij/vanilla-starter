import router from '../../../lib/router.js';
import fetchPrizes from '../fetchers/prizesFetcher.js';
import state$ from '../state.js';
import createPrizesView from '../views/prizesView.js';

const FIRST_YEAR = 1901;
const ITEMS_PER_PAGE = 8;

export const categories = {
  phy: 'Physics',
  che: 'Chemistry',
  lit: 'Literature',
  pea: 'Peace',
  eco: 'Economics',
  med: 'Medical',
};

function createPrizesPage(props) {
  // eslint-disable-next-line prefer-const
  let [category = 'all', year = 'all', page = '1'] = props.params;
  page = parseInt(page, 10);
  state$.update({ category, year, page });

  const getData = async () => {
    state$.update({
      error: null,
      loading: true,
    });

    try {
      const { category, year } = state$.get();
      const prizes = await fetchPrizes({
        nobelPrizeCategory: category === 'all' ? null : category,
        nobelPrizeYear: year === 'all' ? null : year,
        sort: 'desc',
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
      state$.update({ prizes, loading: false });
    } catch (error) {
      console.error(error.stack); // TODO: remove from production
      state$.update({ error, loading: false });
      router.navigateTo('nb-error');
      return;
    }
  };

  const onFindClick = () => {
    getData();
  };

  const onCategoryChange = (e) => {
    const category = e.target.value;
    router.navigateTo('nb-prizes', category, year, 1);
  };

  const onYearChange = (e) => {
    const year = e.target.value;
    router.navigateTo('nb-prizes', category, year, 1);
  };

  const onFirstPageClick = () => {
    router.navigateTo('nb-prizes', category, year, 1);
  };

  const onPrevPageClick = () => {
    router.navigateTo('nb-prizes', category, year, page - 1);
  };

  const onNextPageClick = () => {
    router.navigateTo('nb-prizes', category, year, page + 1);
  };

  const onLastPageClick = () => {
    const { meta } = state$.get().prizes;
    const page = Math.max(1, Math.floor(meta.count / meta.limit) + 1);
    router.navigateTo('nb-prizes', category, year, page);
  };

  const viewProps = {
    onFindClick,
    onCategoryChange,
    onYearChange,
    onFirstPageClick,
    onPrevPageClick,
    onNextPageClick,
    onLastPageClick,
    categories,
    firstYear: FIRST_YEAR,
    category,
    year,
  };
  const view = createPrizesView(viewProps);

  const pageDidLoad = () => {
    state$.subscribe(view);
    getData();
  };

  const pageWillUnload = () => {
    state$.unsubscribe(view);
  };

  return { ...view, pageDidLoad, pageWillUnload };
}

export default createPrizesPage;
