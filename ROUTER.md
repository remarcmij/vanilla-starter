# Router

File: [src/lib/router.js](src/lib/router.js)

The purpose of a (client-side) router in a Single Page Application is to let the client programmatically load different application 'pages' into the DOM by manipulating the browser's location url. In a hash-based router, as used in this repo, the specific page to load is determined by the `hash` fragment of the url. In a url, a hash fragment is the part that starts with a `#` mark. Everything following the `#` mark is considered part of the hash.

We can use the hash to specify the name of the page to load and can optionally embed parameters to pass to the Page function. It can be said that the url when used in such a way becomes part of the application state.

A hash-based router uses an event listener to listen for hash changes and responds to those changes by loading a matching page (see **Implementation** below).

Example of a hash with a page name and two parameters.

```text
#repo/HackYourFuture/UsingAPIs
```

This hash identifies a page named `repo` and two string parameters to be passed to the Page function: `"HackYourFuture"` and `"UsingAPIs"`. The router will call the corresponding Page function effectively like this:

```js
createRepoDetailPage(state, 'HackYourFuture', 'UsingAPIs');
```

## Pros and cons of a hash-based router

The hash fragment in a url is not considered part of the web address. The browser only uses the url parts preceding the hash when making an HTTP request to load an HTML page. In a Single Page Application that uses a hash-based router you can therefore do the following without the need for backend support:

- You can use the browsers back and forward buttons to navigate through your application pages,
- You can reload the browser and return to the same application page as specified by the hash. If the parameters required to fetch data are taken from the hash then that data is re-fetched automatically too.
- You can bookmark an application url and return to the same page in the future.
- You can send the url to a friend who then lands on the expected application page.

The downside of a hash-based router is that the url looks 'funny' because of presence of a hash. It also possible to use a client-side router with regular urls (no hash), however that requires backend support to ensure that always the same `index.html` file loaded, regardless of the presence of additional parameter fragments in the url in addition to the base url.

## Using the Router

The router resided in the `lib` folder and requires a table (actually, an array) with route definitions. This table is normally located in the `pages` folder.

```js
import router from './lib/router.js';
import routes from './pages/routes.js';

function loadApp() {
  // code omitted for brevity

  router.start(routes, pageRoot);
}
```

Here is an example of a basic routes table:

```js
import createHomePage from './homePage.js';
import createAboutPage from './aboutPage.js';

const routes = [
  { path: 'home', page: createHomePage, default: true },
  { path: 'about', page: createAboutPage },
];

export default routes;
```

<!-- prettier-ignore -->
| Property | Description |
|----------|-------------|
| `path` | The name of the page to load. |
| `page` | The Page that should be called to create that page. |
| `default` | If `true`, this route will be used if there is no hash present in the browser's url or if the hash does not represent a known path. The router will use the first route it find marked as default. |

## Router Methods

The router is created in `src/lib/router.js` and is exported as an object with the following methods:

```js
{
  start: (routes: Route[], pageRoot: HTMLElement) => void,
  navigateTo:  (path: string, ...params: any) => void;
}
```

### Method: `router.start()`

This method starts the router.

```js
router.start(routes: Route[], pageRoot: HTMLElement, state?: object) => void
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `routes` | An array of route definitions.|
| `pageRoot` | The DOM element into which pages should be loaded. |

### Method: `router.navigateTo()`

To navigate dynamically to a specific page, we can use the `navigateTo()` method.

> You can also enable navigation to another page by include a static link in DOM subtree of a View, e.g.:
>
> `<a href="#about">Go to About Page</a>`
>
> This is a common pattern in Single Page Application.

```js
router.navigateTo(path: string, ...params: any) => void
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `path` | The path (i.e. name) of the page to load. |
| `...args`  | Zero or more arguments to be passed to the target Page function. |

The `navigateTo()` method encodes the path and optional arguments into a string and assigns it to the browser's location hash. This will trigger hash change event that the router will pick up.

> Tip: You can follow what happens in the application when you navigate through the app by opening the developer console and examining the debug messages. (_Always open the developer console when you are developing!_)
>
> If you are no longer interested in these messages (e.g. when deploying your app) change the minimum log level in `./src/constants.js` to `'fatal'`.

### Dynamic Imports (Advanced Feature)

The router support the dynamic loading of pages at runtime. This means that the files containing the Page functions and all its dependencies is loaded when navigating to a page for the first time. If a page is never visited its files are never loaded by the browser. For larger applications this can considerably improve the load time of the application.

For an example where is this used see the file: [src/examples/nobelprize/pages/routes.js](src/examples/nobelprize/pages/routes.js).

## Other Utility Functions

A couple of other ready-made utility functions are provided in the `src/lib` folder that you may want to consider to use in your own application.

### Function: `fetchData()`

File: [src/lib/fetchData.js](src/lib/fetchData.js)

```js
fetchData(url: string, options?: object) => Promise<any>
```

Fetches JSON data from the Web API specified by the `url` parameter, optionally caching the response.

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `url` | The URL to fetch JSON data from. |
| `options` | Optional. If provided it should be an object with a boolean `cache` property that indicates whether the responses should be cached, e.g. `{ cache: true }`. |

If caching is enabled, subsequent requests to the same `url` are served from the cache. This is particularly useful when using Web APIs that use request rate limiting.

Example usage: [./src/examples/github-2/fetchers/reposFetcher.js](src/examples/github-2/fetchers/reposFetcher.js)

### Function: `findElementsWithIds()`

File: [src/lib/findElementsWithIds.js](src/lib/findElementsWithIds.js)

```ts
findElementsWithIds(root: HTMLElement) => object
```

This function can be used in View functions to quickly find all DOM elements in the View's subtree that have an `id` attribute. It takes a singe parameter, the root of the subtree to search (normally `root`). It returns an object of DOM elements with the `id` as the key and the DOM element as the value. To enable dot notation to access properties of the object it is recommended to use _camelCase_ for the `id` attributes of the DOM elements instead of the usual _kebab-case_.

Example usage: [src/examples/github-2/views/toolbarView.js](src/examples/github-2/views/toolbarView.js)

### Function: `logger.XXX()`

File: [src/lib/logger.js](src/lib/logger.js)

```ts
logger.XXX(label: any, ...args: any) => void
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `label` | A string that identifies the originator of the log message. |
| `...args` | Zero or more arguments that the logger directly passes on to `console.log()`. |

You can use the following actual log methods (in order of increasing severity):

<!-- prettier-ignore -->
| Method | Description |
|--------|-------------|
| `logger.silly()` | The lowest level. For messages that you only want to show up when drilling deep down into your code. |
| `logger.debug()` | For logging debug type messages. |
| `logger.info()` | For logging informational messages. |
| `logger.warning()` | For logging application warnings. |
| `logger.error()` | For logging application errors. |
| `logger.fatal()` |For logging fatal errors that prevent your app from continuing normally. |
| `logger.setLevel(minLevel)` | Sets the minimum level for the logger. The `minLevel` value must be one of `'silly'`, `'debug'`, `'info'`, `'warning'`, `'error'`, `'fatal'` or `'none'`. To suppress all log messages, use the value `'none'` (default). |

You can use this family of log methods to log information to the developer console. Log messages with a level below the `minLevel` will not show up.

Example usage: [src/examples/stopwatch/pages/stopwatchPage.js](src/examples/stopwatch/pages/stopwatchPage.js)

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

### Function: `loadPage()`

This function can be used as an alternative to the router to dynamically load different Page. It takes a two parameters, the name of the Page function to call and a state object that is passed to that function.

The advantage of the function is that its implementation is very simply, in fact simple enough to fully list here:

```js
function loadPage(createPageFn, state) {
  const page = createPageFn(state);

  const appRoot = document.getElementById('app-root');
  appRoot.innerHTML = '';
  appRoot.appendChild(page.root);

  // Reset scroll position to top of page
  window.scrollTo(0, 0);
}
```

The `github-1` example uses this `loadPage` utility function.

The router however provides many benefits over this sample page loader and is therefore preferred.
