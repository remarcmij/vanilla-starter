import findElementsWithIds from '../../../lib/findElementsWithIds.js';

function createToolbarView(props) {
  const root = document.createElement('div');
  root.className = 'toolbar-view toolbar-view-flex';
  root.innerHTML = String.raw`
    <div class="flex-row">
      <select id="selectOrg">
        <option value="HackYourFuture">HackYourFuture</option>
        <option value="HackYourHomework">HackYourHomework</option>
      </select>
    <div class="flex-row">
      <input type="text" class="filter-input" id="filterInput"placeholder="Filter"/>
      <button type="button" id="btnClear" disabled>Clear</button>
    </div>
    </div>
  `;

  const { selectOrg, filterInput, btnClear } = findElementsWithIds(root);

  filterInput.addEventListener('input', props.onFilterInput);
  btnClear.addEventListener('click', props.onClearFilter);
  selectOrg.addEventListener('change', props.onOrganizationChange);

  const update = (state) => {
    filterInput.value = state.filter || '';
    selectOrg.value = state.organization;
    btnClear.disabled = !state.filter;
  };

  return { root, update };
}

export default createToolbarView;
