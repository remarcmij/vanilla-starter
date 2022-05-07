import fetchConversion from '../fetchers/fetchConversion.js';
import fetchSymbols from '../fetchers/fetchSymbols.js';
import createConverterView from '../views/converterView.js';

function createConverterPage() {
  // Initialize local state object.
  let state = { amount: 1 };

  // Internal helper function to update the state.
  const updateState = (updates) => {
    const prevState = state;
    state = { ...prevState, ...updates };
    console.log('state', state);
    view.update(state, prevState);
  };

  // Set up some event handlers.
  const onConvertClick = () => {
    const { from, to, amount } = state;
    convert(from, to, amount);
  };

  const onAmountInput = (event) => {
    updateState({ amount: event.target.value });
  };

  const onFromSelectChange = (event) => {
    updateState({ from: event.target.value });
  };

  const onToSelectChange = (event) => {
    updateState({ to: event.target.value });
  };

  // Pass the event handler as view props.
  const viewProps = {
    onFromSelectChange,
    onToSelectChange,
    onConvertClick,
    onAmountInput,
  };

  // Create the view.
  const view = createConverterView(viewProps);

  // Called to make an API call to convert the specified amount
  // from the 'from' currency to the 'to' currency.
  const convert = async (from, to, amount) => {
    updateState({ loading: true, error: null });
    try {
      const response = await fetchConversion(from, to, amount);
      updateState({ response, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  };

  // Fetch the available currency symbols asynchronously.
  (async () => {
    updateState({ loading: true, error: null });
    try {
      const { symbols } = await fetchSymbols();
      updateState({ symbols, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  })();

  return { root: view.root };
}

export default createConverterPage;
