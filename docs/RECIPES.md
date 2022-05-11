# Tips and Tricks

## 1. Inside Page Functions

### 1.1 Accessing the value property of an input / select element inside a Page function

A Page function does not (should not) have access to the DOM elements of its View. This is a rule of the current Application Architecture, following the _Separation of Concerns_ design principle. So how do we access the value of an input element?

The answer is by the Page function passing an event handler to View that is called when an `"input"` event is fired on the element. The event handler can update the state, from which we can read the value as and when needed.

As the same time, the value of the input element is updated from the state object through the View's `update()` method.

In the example below the `onFilterInput()` event handler trims the string value obtained from the event object and converts it to lowercase before updating the state. The net effect of this is that the value of the input element is always in lowercase, without leading or trailing whitespace. In React, the element would be called a "controlled component".

Full code: [reposPage.js](../src/examples/github/pages/reposPage.js)

```js
function createReposPage(props) {
  // ...

  const onFilterInput = (e) => {
    const filter = e.target.value.trim().toLowerCase();
    state$.update({ filter });
  };

  const onClearFilter = () => {
    state$.update({ filter: '' });
  };

  // ...

  const viewProps = {
    // ...
    onFilterInput,
    onClearFilter,
  };

  const reposView = createReposView(viewProps);

  // ...
}
```

Full code: [toolbarView.js](../src/examples/github/views/toolbarView.js)

```js
function createToolbarView(props) {
  const root = document.createElement('div');
  // simplified
  root.innerHTML = String.raw`
    <div>
      <input type="text" id="filterInput"/>
      <button type="button" id="btnClear" disabled>Clear</button>
    </div>
  `;

  const { filterInput, btnClear } = findElementsWithIds(root);

  filterInput.addEventListener('input', props.onFilterInput);
  btnClear.addEventListener('click', props.onClearFilter);

  const update = (state) => {
    filterInput.value = state.filter || '';
    btnClear.disabled = !state.filter;
  };

  return { root, update };
}
```

### 1.2 Updating local state and calling update()

### 1.3 Fetching data

## 2. Inside View functions

### 2.1 Finding DOM elements with `id` attributes

### 2.2 Avoid unnecessary DOM updates
