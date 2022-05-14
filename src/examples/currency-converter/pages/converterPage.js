import fetchConversion from '../fetchers/fetchConversion.js';
import fetchSymbols from '../fetchers/fetchSymbols.js';
import createConverterView from '../views/converterView.js';

function createConverterPage() {
  // Initialize local state object.
  let state = { amount: 1 };

  // Internal helper function to update the state and call the `update()` method
  // of the view.
  const updateState = (updates) => {
    const prevState = { ...state };
    state = { ...state, ...updates };
    console.log('state', state);
    view.update(state, prevState);
  };

  // Set up some event handlers.
  const onConvertClick = () => {
    const { from, to, amount } = state;
    convert(from, to, amount);
  };

  const onAmountInput = (event) => {
    updateState({ amount: event.target.value, response: null });
  };

  const onFromSelectChange = (event) => {
    updateState({ from: event.target.value, response: null });
  };

  const onToSelectChange = (event) => {
    updateState({ to: event.target.value, response: null });
  };

  // Pass the event handler as view props.
  const viewProps = {
    onFromSelectChange,
    onToSelectChange,
    onConvertClick,
    onAmountInput,
  };

  // Create the view, passing the view props as argument.
  const view = createConverterView(viewProps);

  // Internal function to make an API call for converting the specified amount
  // from the 'from' currency to the 'to' currency. Called by the onConvertClick
  // event handler.
  const convert = async (from, to, amount) => {
    updateState({ loading: true, error: null });
    try {
      const response = await fetchConversion(from, to, amount);
      updateState({ response, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  };

  // Fetch the available currency symbols asynchronously at page creation time.
  // When the data comes back, we will update the state and let the view know
  // to update itself.
  (async () => {
    updateState({ loading: true, error: null });
    try {
      const { symbols } = await fetchSymbols();
      updateState({ symbols, loading: false });
    } catch (error) {
      updateState({ error, loading: false });
    }
  })();

  return view;
}

export default createConverterPage;
