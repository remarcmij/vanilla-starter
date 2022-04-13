# Vanilla Starter Project

Live demo: <https://remarcmij.github.io/vanilla-starter/>

**TL;DR** To find out how use this repo for your own project, go **[here](#using-this-starter-for-your-own-project)**.

This repo is an example of Single Page Application that uses a hash-based router, all written in vanilla JavaScript (no libraries used). It can also be used as a template for generating a starter repo for your own application based on the principles outlined in this README.

## Installing Dependencies

To install the recommended ESLint and Prettier dependencies for use during development, issue the command:

```bash
npm install
```

## Code Organization

In this starter project we present a recommended folder structure and recommendations for the design of your application code.

### Folder Structure

```text
public
src
└── examples
└── fetchers
└── lib
└── pages
└── views
└── app.js
└── constants.js
└── index.js
└── .credentials.js
index.html
```

> Note: Students at HackYourFuture may recognize this folder structure as similar to the one introduced in the Group Project of the Browsers module.

<!-- prettier-ignore -->
| Folder | Description |
|--------|-------------|
| `public` | This folder contains the static files that can be used by the `index.html` file. |
| `src` | This folder contains all of the JavaScript code. |
| `src/examples` | This folder contains a couple of fully worked-out examples that were built using the principles that are outlined in this document. If no longer needed, this folder and its contents can be deleted. |
| `src/fetchers` | This folder contain functions that deal with fetching application data from specific urls for use by Page functions. |
| `src/lib` | This folder provides some ready-made utility functions that you can use in your application. (See below.) |
| `src/pages` | This folder contains functions that create pages to be loaded in the UI, for instance a Home page, an About page etc. Page functions sreturn a subtree of DOM elements and contain logic to handle user interactions and, optionally, logic for fetching data from Web APIs.<br>The actual creation and update of DOM elements can be delegated a companion View function<sup>1</sup>.<br>A Page function by the router when a specific page needs to be loaded into the DOM. When not using a router, it can also be called manually (for example of where this is done, see `app.js` from the `pokemons` example). |
| `src/views` | This folder contains functions called upon by Page functions to create a subtree of DOM elements and update the subtree as the application state changes. To enable user interactions, Page functions can also pass event handler functions to View functions to be added as event listeners to the View's DOM elements. |
| `app.js` |  This file contains the start-up code for the app. When using the router, this is where it is created and attached to the DOM. |
| `constants.js` | This file contains constants for use throughout your application. |
| `index.js` | This file contains the main entry point for your application. |
| `.credentials.js` | This file can be used to define constants for secret API keys, etc. It is listed in `.gitignore` and will therefore not be added to your repo, which is particularly important if you publish your repo on GitHub. This file is not included in the repo (exactly because it is git-ignored), but an example is provided as `.credentials.example.js` |
| `index.html` | The one and only HTML file for the application. It includes a `<div>` element that serves as the root element for our application. It also loads the `app.js` file using a `<script>` tag with a `type="module"` attribute so that you can use ES6 `import` and `export` keywords to load additional modules.

<sup>1</sup>In support of the principle of _Separation of Concerns_.

## Advanced Application Architecture

**_You can use the provided folder structure to build an application as you see fit without using any of the recommendations for application design described in this and the next sections. These recommendations are entirely optional._**

In the sections that follow we will outline architectural patterns and techniques that will help you to build a robust, maintainable Single Page Application using concepts inspired by libraries/frameworks such as React and Angular.

> **Application Architecture Definition**
>
> _An application architecture describes the patterns and techniques used to design and build an application. The architecture gives you a roadmap and best practices to follow when building an application, so that you end up with a well-structured app._
>
> _Software design patterns can help you to build an application. A pattern describes a repeatable solution to a problem._
>
> Source: RedHat, [What is an application architecture?](https://www.redhat.com/en/topics/cloud-native-apps/what-is-an-application-architecture)

We will outline patterns for standard Page and View functions, standard techniques for handling events and for fetching data. We also introduce the concept of a client-side **router**, which allows the SPA to programmatically load different pages, by applying, and responding to, changes to the browser's `location` url.

Let's start with Page functions.

### Page functions: `createXXXPage()`

A Page function represents an application page. When using a router, it is called by the router to create the page when the user navigates to it. After the page is created, the router loads its DOM subtree into the DOM.

When used without a router the Page function can be called manually to create the page and use its root DOM element for manual loading into the DOM.

A Page function is responsible for handling all user interactions for the page and for initiating and handling the fetching of data from Web APIs where required. Unless the page is very simple, the creation and updating of DOM elements is normally delegated to a companion View function, which is then called by the Page function.

The name of a Page function should follow the naming convention **create**_XXX_**Page**, where _XXX_ is the name of the Page. Example: `createAboutPage`. Each Page function should be in a separate file, named `xxxPage.js`, e.g., `aboutPage.js`.

The function signature for a Page function is as follows:

> _Note: Throughout this README we will use the TypeScript syntax for presenting function definitions. This syntax is similar to the Intellisense that you can see when you hover the mouse pointer over a function header in VSCode._

```js
createXXXPage(...params: any) => {
  root: HTMLElement,
  update?: Function,
  pageDidLoad?: Function,
  pageWillUnload?: Function
}
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `...params` | When using a router, any parameters encoded in the browser's location url will be passed to the Page function. |

A Page function should return an object with, with the following properties:

<!-- prettier-ignore -->
| Property | Required? | Description |
|----------|:---------:|----------|
| **`root`** | Yes | Holds a reference to the `root` element of the DOM subtree created by the Page function (or created for the Page function by a corresponding View function). |
| **`update`** | No | If provided, it should be a function that updates the DOM subtree with the latest application state information. This function is normally implemented in a View function and passed back to the corresponding Page function.  |
| **`pageDidLoad`** | No | If provided, it will be called by the router just after the page is loaded. |
| **`pageWillUnload`** | No | If provided, it will be called by the router just before the page is unloaded. |

Code example: [`src/examples/github-2/pages/repoDetailPage.js`](src/examples/github-2/pages/repoDetailPage.js)

The standard pattern for a Page function is similar to:

```js
import createExampleView from '../views/exampleView.js';

function createExamplePage() {
  const viewProps = {
    // Add properties to be passed to the View function
  };
  const exampleView = createExampleView(viewProps);

  // Place any code needed to initialize the page, e.g. to fetch data, here.

  // Return the object containing the root DOM element for this page to the
  // the router.
  return exampleView;
}

export default createExamplePage;
```

A Page function can pass event handlers to the View function through the `props` object. The View function can then add the event handler to the target DOM elements by calling `.addEventListener()` on the elements.

```js
import router from '../../lib/router.js';
import createAboutView from '../views/aboutView.js';

function createAboutPage() {
  const viewProps = { onClick: () => router.navigateTo('home') };
  return createAboutView(viewProps);
}
```

### View functions: `createXXXView()`

The name of a View function should follow the naming convention **create**_XXX_**View**, where _XXX_ is the name of the View. Example: `createAboutView`. Each View function should be in a separate file, named `xxxView.js`, e.g., `aboutView.js`.

The function signature for a View function is as follows:

```js
createXXXView(props?: object) => { root: HTMLElement, update?: Function }
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `props`   | On object with properties that hold values and/or event handler functions to be used when creating the View's DOM subtree. |

View functions are used to create and update DOM elements in the service of corresponding Page functions or parent View functions. A View function can render application data and add any event handlers passed to it through the `props` parameter. It must return an object with the following properties:

<!-- prettier-ignore -->
| Property | Description |
|----------|-------------|
| **`root`** | Holds a reference to the `root` element of the DOM subtree created by the View function. |
| **`update`** | Optional. If provided, it should be a function that updates the DOM subtree with the latest application state information. |

A View function typically first creates a DOM element that represents the `root` element of the View's DOM subtree. It can then add child elements to that root through its `.innerHTML` property or through calls to `.appendChild()`.

> Warning: You should not use `.innerHTML` for production applications. There are potential security issues associated with its use. However, since you are expected to later switch to established libraries, such as React (which uses HTML-like syntax called JSX), we have in this starter repo opted to take advantage of the simplicity and convenience that `.innerHTML` provides for defining HTML structures.<br>
> For more info on the security issues associated with `.innerHTML`, see [Security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations) on the MDN web site.

Here is an example of a simple View function.

```js
function createHomeView(props) {
  const root = document.createElement('div');
  root.className = 'dialog-container';
  root.innerHTML = String.raw`
    <h1>${props.text}</h1>
  `;

  return { root };
}

export default createHomeView;
```

> _Tip: There is a handy VSCode extension that adds syntax coloring to JavaScript string templates if they contain HTML code. It also adds [emmet](https://emmet.io/) support. Install this extension and then mark your HTML string templates with `String.raw` to enable the magic.<br>
> Find it here: [Visual Studio Marketplace: lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)_

Inside the View function you can access child elements the `root` element by calling `.querySelector()` on it, or by using the provided utility function `findElementsWithIds()` (see below).

A View function may call other View functions and incorporate their root elements as child elements of its own DOM subtree.

> _What you should **not** do is access DOM element (e.g. by using `document.getElementById()` or `document.querySelector()`) outside of the View function where the DOM elements are created. This would be a violation of the architectural principles outlined here and because of it breaking the rules, introduce a potential maintenance issue. If you find yourself needing to violate this rule you probably need to rethink the way you have organized your pages and views._

#### The `update()` callback

A View function can return an optional `update()` callback function that can be called to update the view after changes have been made to the application state. The application state is held in a JavaScript object that is passed as argument to the `update()` callback.

Here is an example:

File: [src/examples/github-2/views/toolbarView.js](src/examples/github-2/views/toolbarView.js)

```js
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
```

The UI rendered by this View function looks like this:

![toolbar](./readme-assets/toolbar.png)

The `update()` function is used here to update the values of organization `<select>` element and the `<input>` element and to disable the **Clear** `<button>` if the filter field is empty.

The `input` element is completely controlled through code (in React this is called a _controlled component_). For instance, the `onFilterInput()` event handler ignore any leading and/or trailing spaces and convert any uppercase letters to lowercase. Then, the `input` element's value attribute is updated accordingly.

#### Fetching data in a Page function

Here is an example (simplified) of the recommended practice for fetching data from a Web API inside a Page function.

```js
function createPokemonsPage() {
  let state = {};

  const getPokemons = async () => {
    state = { ...state, loading: true, error: null };
    pokemonsView.update(state);

    try {
      const data = await fetchData(`${BASE_URL}?limit=151`);
      state = { ...state, pokemons: data.results, loading: false };
      pokemonsView.update(state);
    } catch (error) {
      state = { ...state, error, loading: false };
      pokemonsView.update(state);
    }
  };

  const onGetClick = () => getPokemons();

  const viewProps = { onGetClick };
  const pokemonsView = createPokemonsView(viewProps);

  return pokemonsView;
}
```

Full implementation: [src/examples/pokemons/pages/pokemonsPage.js](src/examples/pokemons/pages/pokemonsPage.js)

Page functions are _not_ called asynchronously by the router. However, data fetches _must_ be done asynchronously. Therefore, the recommended practice is to use a an internal async function to fetch the data and call that function inside the Page function.

In this example, before calling `fetchData()` we update the local state object using ES7 [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

> **Demystifying the Spread Syntax and Object Shorthand Notation**
>
> `state = { ...state, loading: true, error: null };`
>
> This statement assigns a new object to `state` variable by first spreading out its current properties and then adding the `loading` and `error` properties or overwriting them if they already exist.
>
> `state = { ...state, error, loading: false };`
>
> Here, ES6 object shorthand notation is used for the `error` property. It is equivalent to `error: error`.

The `loading` property is used to indicate that a loading indicator (e.g., a spinner) should be shown in the UI before we initiate the data fetch and hidden on completion.

The `error` property is used to indicate that an error has occurred and that the UI should be updated accordingly.

The `pokemons` property is used to hold the fetched data in this example.

Each time that we update the state object we need to call the `update()` function of the View so that it can update its DOM subtree. See the [actual implementation](src/examples/pokemons/pages/pokemonsPage.js) how this can be done is a less repetitive way (following the DRY principle).

In the corresponding View function (simplified) the `update()` callback function typically handles the loading and render phases as follows:

```js
//...

const update = (state) => {
  // Show or hide the loading indicator
  if (state.loading) {
    spinnerView.root.classList.remove('hide');
  } else {
    spinnerView.root.classList.add('hide');
  }

  // In case of an error, render it and return early.
  if (state.error) {
    dom.messageContainer.classList.remove('hide');
    dom.messageContainer.textContent = state.error.message;
    return;
  }

  // If there is no error and we have data, we can render it.
  if (state.pokemons) {
    // Code omitted for brevity
  }
};
```

Full implementation: [src/examples/pokemons/views/pokemonsView.js](src/examples/pokemons/views/pokemonsView.js)

## Router

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

### Pros and cons of a hash-based router

The hash fragment in a url is not considered part of the web address. The browser only uses the url parts preceding the hash when making an HTTP request to load an HTML page. In a Single Page Application that uses a hash-based router you can therefore do the following without the need for backend support:

- You can use the browsers back and forward buttons to navigate through your application pages,
- You can reload the browser and return to the same application page as specified by the hash. If the parameters required to fetch data are taken from the hash then that data is re-fetched automatically too.
- You can bookmark an application url and return to the same page in the future.
- You can send the url to a friend who then lands on the expected application page.

The downside of a hash-based router is that the url looks 'funny' because of presence of a hash. It also possible to use a client-side router with regular urls (no hash), however that requires backend support to ensure that always the same `index.html` file loaded, regardless of the presence of additional parameter fragments in the url in addition to the base url.

### Using the Router

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

### Router Methods

The router is created in `src/lib/router.js` and is exported as an object with the following methods:

```js
{
  start: (routes: Route[], pageRoot: HTMLElement) => void,
  navigateTo:  (path: string, ...params: any) => void;
}
```

#### Method: `router.start()`

This method starts the router.

```js
router.start(routes: Route[], pageRoot: HTMLElement, state?: object) => void
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `routes` | An array of route definitions.|
| `pageRoot` | The DOM element into which pages should be loaded. |

#### Method: `router.navigateTo()`

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

### Function: `log.XXX()`

File: [src/lib/logger.js](src/lib/logger.js)

```ts
log.XXX(label: any, ...args: any) => void
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
| `log.silly()` | The lowest level. For messages that you only want to show up when drilling deep down into your code. |
| `log.debug()` | For logging debug type messages. |
| `log.info()` | For logging informational messages. |
| `log.warning()` | For logging application warnings. |
| `log.error()` | For logging application errors. |
| `log.fatal()` |For logging fatal errors that prevent your app from continuing normally. |
| `log.setLevel(minLevel)` | Sets the minimum level for the logger. The `minLevel` value must be one of `'silly'`, `'debug'`, `'info'`, `'warning'`, `'error'`, `'fatal'` or `'none'`. To suppress all log messages, use the value `'none'` (default). |

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
import log from '../../lib/logger.js';
import createObservableState from '../../lib/observableState.js';

const state$ = createObservableState();

// Subscribe to log state changes to the console
state$.subscribe((state) => {
  log.debug('state', state);
});

export default state$;
```

Here, an observable state object is created that can be imported by other modules. The state object is then used to update the state of the application. Note the use of the use of a `$` sign to indicate (by convention) that the variable is an observable state.

During development, it is helpful to be able see state changes in the console as the application is running. This is done here by subscribing to the observable state and logging the state changes using the `log.debug()` method.

Here is an example of how the observable state is used in a Page function:

```js
import router from '../../../lib/router.js';
import fetchRepos from '../fetchers/reposFetcher.js';
import state$ from '../state.js';
import createReposView from '../views/reposView.js';

function createReposPage(organization = 'HackYourFuture') {
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

## Using this starter for your own project

1. In GitHub, click on the **Use this template** button to generate a repository on your own GitHub account using the files of this repo.

2. Clone the generated repo from your own GitHub account to your local computer.

3. In `src/index.js`, uncomment the import of `./app` and comment out the import of `./examples/...`. (When you no longer need the examples, you can remove this line and remove the `examples` folder altogether.)

   ```js
   // import loadApp from './examples/all/app.js';
   import loadApp from './app.js';
   ```

4. In `src/index.html`, modify the contents of the `<head>` as you see fit, taking out no longer needed style sheets and adding in your own.

5. Load the application in your browser. You should now see the message from the Home Page: **Hello world!**.

6. Navigate back and forth between the Home Page and the About Page and observe how the address bar in the browser changes.

7. Change the Page and View functions in the `src/pages` and `src/views` folders as required for your app.

8. Add further Page, View function as needed. Update the routes table in `src/page/routes.js` to add routes for the new pages.

9. If in doubt how to achieve some specific functionality, examine the `examples` folder for possible approaches.
