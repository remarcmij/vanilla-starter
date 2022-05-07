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

  const { fromSelect, toSelect, amountInput, convertButton, resultContainer } =
    findElementsWithId(root);

  amountInput.addEventListener('input', props.onAmountInput);
  convertButton.addEventListener('click', props.onConvertClick);
  fromSelect.addEventListener('change', props.onFromSelectChange);
  toSelect.addEventListener('change', props.onToSelectChange);

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

  const addSeparator = (select) => {
    const separator = document.createElement('option');
    separator.textContent = '---';
    separator.disabled = true;
    select.appendChild(separator);
  };

  const update = (state, prevState) => {
    if (state.loading) {
      resultContainer.innerHTML = 'Loading...';
      return;
    }

    resultContainer.innerHTML = '';

    if (state.error) {
      resultContainer.innerHTML = 'Oops, something went wrong!';
      console.error(state.error);
      return;
    }

    amountInput.value = state.amount;

    if (state.from && state.to && state.amount) {
      convertButton.disabled = false;
    } else {
      convertButton.disabled = true;
    }

    if (state.response && state.response !== prevState.response) {
      const resultView = createResultView(state.response);
      resultContainer.innerHTML = '';
      resultContainer.appendChild(resultView.root);
    }

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
