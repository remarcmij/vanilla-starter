# Recipes

## 1. Page Functions

### 1.1 Updating the state object and calling update()

In the [`homePage.js`](../src/pages/homePage.js) starter code (see Original code below) we repeatedly update the state object and call the `update()` function from the View to update to let it update it DOM elements.

To eliminate this repetition we can introduce a small helper function (see Improved code). This `updateState()` helper function takes as an argument an object that just contains the updates that we want to make to the state. Now that we have a single point where these updates are made to the state, we can also slip in a `console.log` that will print the state object to the console each time it is updated. Because the state object plays such a central role in the app, logging it each time it is updated makes easier for us to see what is going on during development.

**Original code:**

```js
import createHomeView from '../views/homeView.js';

function createHomePage() {
  let state = { count: 0 };

  const onIncrement = () => {
    state = { ...state, count: state.count + 1 };
    view.update(state);
  };

  const onDecrement = () => {
    state = { ...state, count: state.count - 1 };
    view.update(state);
  };

  const viewProps = { onIncrement, onDecrement };
  const view = createHomeView(viewProps);

  view.update(state);

  return view;
}

export default createHomePage;
```

**Improved code:**

```js
import createHomeView from '../views/homeView.js';

function createHomePage() {
  let state = { count: 0 };

  const updateState = (updates) => {
    state = { ...state, ...updates };
    console.log('state', state);
    view.update(state);
  };

  const onIncrement = () => {
    updateState({ count: state.count + 1 });
  };

  const onDecrement = () => {
    updateState({ count: state.count - 1 });
  };

  const viewProps = { onIncrement, onDecrement };
  const view = createHomeView(viewProps);

  view.update(state);

  return view;
}

export default createHomePage;
```

### 1.2 Accessing the value property of an \<input> element inside a Page function

A Page function does not (should not) have access to the DOM elements of its View. This in an application of the _Separation of Concerns_ design principle that this Application Architecture adheres to. Given this restriction, how do we access the value of an `<input>` element?

The answer is for the Page function to passing an event handler to View that is called when an `"input"` event is fired on the element. The event handler can update the state. Whenever we need the value of the input field inside Page function, we can now access it from the state object.

As the same time, the value of the input element can also be updated inside the View from the state object, through the View's `update()` method. This allow the event handler in the Page function to control the value of the input element.

In the example below the `onFilterInput()` event handler trims the string value obtained from the event object and converts it to lowercase before updating the state. The net effect of this is that the value of the input element is always in lowercase, without leading or trailing whitespace. In React, this would be called a "controlled component".

Note that the same technique can be applied for similar input elements, such as the `<select>` element.

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

### 1.3 Fetching data and showing a loading indicator

Here is an example (simplified) of the recommended practice for fetching data from a Web API inside a Page function.

```js
function createFooPage() {
  let state = {};

  const getData = async () => {
    state = { ...state, loading: true, error: null, data: null };
    view.update(state);

    try {
      const data = await fetchData(`${BASE_URL}?q=foo`);
      state = { ...state, data: data, loading: false };
      view.update(state);
    } catch (error) {
      state = { ...state, error: error, loading: false };
      view.update(state);
    }
  };

  const onGetClick = () => getData();

  const viewProps = { onGetClick };
  const view = createFooView(viewProps);

  return view;
}
```

Figure 1 below illustrates the recommended interactions between the Page and View objects when fetching data from a Web API.

![fetch-data](./assets/fetch-data.png)<br>
Figure 1: **Fetching data in a Page function**

These are the steps involved:

1. The user click on a button to to retrieve data from a Web API. The `"click"` event is handled by the `onClick` event handler inside the Page function.

2. The event handler updates the state object: it set the `loading` property to `true`, the `error` property to `null` (e.g. no error yet), and the `data` property to `null` (e.g. no data yet). The Page object will then call the `update()` method of the View object with the updated state object as an argument.

3. Inside `update()` method of the View, the `loading` property is checked. If it is `true`, the View will show a loading indicator. Otherwise, it will hide it.

4. The Page object will now make a network request to try and fetch data from the Web API.

5. Some time later, the network request completes, hopefully with a successful response.

6. The Page object will then update the state object with the new data and the `loading` property set to `false`. It will call the `update()` method of the View object again with the updated state object as an argument.

7. The View will then update its DOM subtree with the new data: it will hide the loading indicator (`loading: false`) and show the data.

For a fully worked-out example inspect the [Pokemons example](../src/examples/pokemons/pages/pokemonsPage.js) in this repository.

## 2. View functions

### 2.1 Finding DOM elements with `id` attributes

### 2.2 Avoid unnecessary DOM updates
