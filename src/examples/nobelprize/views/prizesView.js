import findElementsWithIds from '../../../lib/findElementsWithIds.js';
import createPrizeListItemView from './prizeListItemView.js';
import createSpinnerView from './spinnerView.js';

function createPrizesView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Nobel Prizes</h3>
        <select id="categorySelect">
          <option value="all">All Categories</option>
        </select>
        <select id="yearSelect">
          <option value="all">Any Year</option>
        </select>
      </div>
    </header>
    <div class="prizes-container">
      <h1 id="messageContainer" class="hide">No Prizes Found</h1>
      <ul id="prizeList" class="item-list"></ul>
    </div>
    <div hidden class="pagination-button-container" id="paginationButtonContainer">
      <button type="button" id="firstBtn">First Page</button>
      <button type="button" id="prevBtn">Previous</button>
      <button type="button" id="nextBtn">Next</button>
      <button type="button" id="lastBtn">Last Page</button>
    </div>
  `;

  const spinnerView = createSpinnerView();
  root.appendChild(spinnerView.root);

  const {
    categorySelect,
    yearSelect,
    messageContainer,
    prizeList,
    paginationButtonContainer,
    firstBtn,
    prevBtn,
    nextBtn,
    lastBtn,
  } = findElementsWithIds(root);

  firstBtn.addEventListener('click', props.onFirstPageClick);
  prevBtn.addEventListener('click', props.onPrevPageClick);
  nextBtn.addEventListener('click', props.onNextPageClick);
  lastBtn.addEventListener('click', props.onLastPageClick);

  Object.entries(props.categories).forEach(([key, title]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = title;
    categorySelect.appendChild(option);
  });
  categorySelect.addEventListener('change', props.onCategoryChange);
  if (props.category) {
    categorySelect.value = props.category;
  }

  const today = new Date();
  const thisYear = today.getFullYear();

  for (let year = thisYear; year >= props.firstYear; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
  yearSelect.addEventListener('change', props.onYearChange);
  if (props.year) {
    yearSelect.value = props.year;
  }

  const update = (state) => {
    messageContainer.classList.add('hide');

    if (state.loading) {
      spinnerView.root.classList.remove('hide');
    } else {
      spinnerView.root.classList.add('hide');
    }

    if (state.error) {
      return;
    }

    if (!state.prizes) {
      return;
    }

    const { nobelPrizes, meta } = state.prizes;

    if (nobelPrizes.length === 0) {
      messageContainer.classList.remove('hide');
    }

    prizeList.innerHTML = '';
    nobelPrizes.forEach((prize) => {
      const prizeListItemView = createPrizeListItemView({
        prize,
        category: state.category,
        year: state.year,
      });
      prizeList.appendChild(prizeListItemView.root);
    });

    if (meta.count < meta.limit) {
      paginationButtonContainer.classList.add('hide');
    } else {
      paginationButtonContainer.classList.remove('hide');
    }

    if (meta.offset === 0) {
      firstBtn.setAttribute('disabled', 'disabled');
      prevBtn.setAttribute('disabled', 'disabled');
    } else {
      firstBtn.removeAttribute('disabled');
      prevBtn.removeAttribute('disabled');
    }

    if (meta.offset + meta.limit >= meta.count) {
      nextBtn.setAttribute('disabled', 'disabled');
      lastBtn.setAttribute('disabled', 'disabled');
    } else {
      nextBtn.removeAttribute('disabled');
      lastBtn.removeAttribute('disabled');
    }
  };

  return { root, update };
}

export default createPrizesView;
