function createToolbarView(props) {
  const root = document.createElement('div');
  root.className = 'toolbar-view toolbar-view-flex';
  root.innerHTML = String.raw`
    <div class="flex-row">
      <select id="select-org">
        <option value="HackYourFuture">HackYourFuture</option>
        <option value="HackYourHomework">HackYourHomework</option>
      </select>
    <div class="flex-row">
      <input type="text" class="filter-input" placeholder="Filter"/>
      <button type="button" id="btn-clear" disabled>Clear</button>
    </div>
    </div>
  `;

  const filterInput = root.querySelector('.filter-input');
  filterInput.addEventListener('input', props.onFilterInput);

  const btnClear = root.querySelector('#btn-clear');
  btnClear.addEventListener('click', props.onClearFilter);

  const selectOrg = root.querySelector('#select-org');
  selectOrg.addEventListener('change', props.onOrganizationChange);

  const update = (state) => {
    filterInput.value = state.filter || '';
    selectOrg.value = state.organization;
    btnClear.disabled = !state.filter;
  };

  return { root, update };
}

export default createToolbarView;
