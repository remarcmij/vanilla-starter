# Observable State

![observable-state](./assets/observable-state.png)<br>
Figure 1: **Observable Global State Interactions**

### Function: `createObservableState()` (Advanced Feature)

File: [src/lib/observableState.js](src/lib/observableState.js)

```ts
createObservableState() => {
  subscribe: (subscriber: Function) => void,
  unsubscribe: (subscriber: Function) => void,
  update: (updates: object) => object,
  get: () => object
}
```

This function creates an "observable state" and returns an object containing four methods to use that state. It is best used in combination with the router to simplify sending state updates to View functions.

Here is how it is typically used:

File: [src/examples/github-2/state.js](src/examples/github-2/state.js)

```js
import logger from '../../lib/logger.js';
import createObservableState from '../../lib/observableState.js';

const state$ = createObservableState();

// Subscribe to log state changes to the console
state$.subscribe((state) => {
  logger.debug('state', state);
});

export default state$;
```

Here, an observable state object is created that can be imported by other modules. The state object is then used to update the state of the application. Note the use of the use of a `$` sign to indicate (by convention) that the variable is an observable state.

During development, it is helpful to be able see state changes in the console as the application is running. This is done here by subscribing to the observable state and logging the state changes using the `logger.debug()` method.

Here is an example of how the observable state is used in a Page function:

```js
import router from '../../../lib/router.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import state$ from '../state.js';
import createReposView from '../views/reposView.js';

function createReposPage(props) {
  const [organization = 'HackYourFuture'] = props.params;
  state$.update({ organization });

  // code omitted for brevity

  const reposView = createReposView(viewProps);

  const getData = async () => {
    state$.update({ error: null, loading: true, repos: null });

    try {
      const repos = await fetchRepos(organization);
      state$.update({ repos, loading: false });
    } catch (error) {
      state$.update({ error, loading: false });
      router.navigateTo('gh-error');
      return;
    }
  };

  getData();

  const pageDidLoad = () => {
    state$.subscribe(reposView.update);
  };

  const pageWillUnload = () => {
    state$.unsubscribe(reposView.update);
  };

  return { ...reposView, pageDidLoad, pageWillUnload };
}
```

As you can see, the Page subscribes to the observable state when the page is loaded and unsubscribes just before the page is unloaded. The `pageDidLoad` and `pageWillUnload` "lifecycle" functions are called by the router at the appropriate times.

To make these functions available to the router they must be added to the object that is returned by the Page function. Here, ES7 object spread syntax is used for that.
