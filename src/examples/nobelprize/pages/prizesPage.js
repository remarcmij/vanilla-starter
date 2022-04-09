import state$ from '../../../lib/observableState.js';
import router from '../../../lib/router.js';
import fetchPrizes from '../fetchers/prizesFetcher.js';
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

function createPrizesPage(category = 'all', year = 'all', page = '1') {
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
      router.navigateTo('error');
      return;
    }
  };

  const onFindClick = () => {
    getData();
  };

  const onCategoryChange = (e) => {
    const category = e.target.value;
    router.navigateTo('prizes', category, year, 1);
  };

  const onYearChange = (e) => {
    const year = e.target.value;
    router.navigateTo('prizes', category, year, 1);
  };

  const onFirstPageClick = () => {
    router.navigateTo('prizes', category, year, 1);
  };

  const onPrevPageClick = () => {
    router.navigateTo('prizes', category, year, page - 1);
  };

  const onNextPageClick = () => {
    router.navigateTo('prizes', category, year, page + 1);
  };

  const onLastPageClick = () => {
    const { meta } = state$.get().prizes;
    const page = Math.max(1, Math.floor(meta.count / meta.limit) + 1);
    router.navigateTo('prizes', category, year, page);
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
  const prizesView = createPrizesView(viewProps);

  const pageDidMount = () => {
    state$.subscribe(prizesView.update);
    getData();
  };

  const pageWillUnmount = () => {
    state$.unsubscribe(prizesView.update);
  };

  return { ...prizesView, pageDidMount, pageWillUnmount };
}

export default createPrizesPage;
