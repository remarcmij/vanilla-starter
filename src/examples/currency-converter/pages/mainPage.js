import createMainView from '../views/mainView.js';
import fetchSymbols from '../fetchers/fetchSymbols.js';
import fetchConversion from '../fetchers/fetchConversion.js';
import state$ from '../state.js';

function createMainPage() {
  state$.set({ amount: 1 });

  const onConvertClick = () => {
    const { from, to, amount } = state$.get();
    convert(from, to, amount);
  };

  const onAmountInput = (event) => {
    state$.update({ amount: event.target.value });
  };

  const onFromSelectChange = (event) => {
    state$.update({ from: event.target.value });
  };

  const onToSelectChange = (event) => {
    state$.update({ to: event.target.value });
  };

  const viewProps = {
    onFromSelectChange,
    onToSelectChange,
    onConvertClick,
    onAmountInput,
  };

  const mainView = createMainView(viewProps);

  const convert = async (from, to, amount) => {
    state$.update({ loading: true, error: null });
    try {
      const response = await fetchConversion(from, to, amount);
      state$.update({ response, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
    }
  };

  const getSymbols = async () => {
    state$.update({ loading: true, error: null });
    try {
      const { symbols } = await fetchSymbols();
      state$.update({ symbols, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
    }
  };

  getSymbols();

  const pageDidLoad = () => {
    state$.subscribe(mainView.update);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(mainView.update);
  };

  return { ...mainView, pageDidLoad, pageWillUnload };
}

export default createMainPage;
