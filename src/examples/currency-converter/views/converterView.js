import findElementsWithId from '../../../lib/findElementsWithIds.js';
import createResultView from './resultView.js';

function createConverterView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="ex__header-content">
        <h3>Currency Converter</h3>
        <select id="fromSelect" class="ex__symbol-select">
          <option value="">From</option>
        </select>
        <select id="toSelect" class="ex__symbol-select">
          <option value="">To</option>
        </select>
        <input id="amountInput" class="ex__amount-input" type="number">
        <button type="button" id="convertButton">Convert</button>
      </div>
    </header>
    <div class="ex__result-container ex__white-frame" id="resultContainer"></div>
  `;

  // The handy `findElementsWithIds` function from the `lib` folder let us
  // quickly find all child elements with `id` attributes. It saves us the
  // trouble of repeatedly calling `root.querySelector()` ourselves.
  const { fromSelect, toSelect, amountInput, convertButton, resultContainer } =
    findElementsWithId(root);

  // Attach the event listeners passed as props to the relevant elements.
  amountInput.addEventListener('input', props.onAmountInput);
  convertButton.addEventListener('click', props.onConvertClick);
  fromSelect.addEventListener('change', props.onFromSelectChange);
  toSelect.addEventListener('change', props.onToSelectChange);

  // Internal function to populate the `fromSelect` and `toSelect` elements with
  // the currency symbols.
  const populateSymbols = (symbols) => {
    symbols.forEach((symbol) => {
      const fromOption = document.createElement('option');
      fromOption.value = symbol;
      fromOption.textContent = symbol;
      fromSelect.appendChild(fromOption);

      const toOption = document.createElement('option');
      toOption.value = symbol;
      toOption.textContent = symbol;
      toSelect.appendChild(toOption);
    });
  };

  // Internal function to add separator lines between the main and the other
  // currency symbols.
  const addSeparator = (select) => {
    const separator = document.createElement('option');
    separator.textContent = '───';
    separator.disabled = true;
    select.appendChild(separator);
  };

  const update = (state, prevState) => {
    if (state.loading) {
      resultContainer.innerHTML = 'Loading...';
      return;
    }

    resultContainer.innerHTML = '';

    // In case of an error, render it and return early.
    if (state.error) {
      resultContainer.innerHTML = 'Oops, something went wrong!';
      console.error(state.error);
      return;
    }

    // Update the amount input with the current amount value from the state
    // object.
    amountInput.value = state.amount;

    // Enable the Convert button only if we have selected `from` and `to`
    // currencies and an amount value in the state object.
    if (state.from && state.to && state.amount) {
      convertButton.disabled = false;
    } else {
      convertButton.disabled = true;
    }

    // Render the conversion response if present in the state object.
    if (state.response) {
      const resultView = createResultView(state.response);
      resultContainer.innerHTML = '';
      resultContainer.appendChild(resultView.root);
    }

    // Populate the `fromSelect` and `toSelect` elements with the currency
    // symbols if not done so already.
    if (state.symbols && state.symbols !== prevState.symbols) {
      const symbols = Object.keys(state.symbols);
      const mainSymbols = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
      const otherSymbols = symbols.filter(
        (symbol) => !mainSymbols.includes(symbol)
      );
      populateSymbols(mainSymbols);
      addSeparator(fromSelect);
      addSeparator(toSelect);
      populateSymbols(otherSymbols);
    }
  };

  return { root, update };
}

export default createConverterView;
