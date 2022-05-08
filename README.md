# Vanilla Starter Project

Live demo: <https://remarcmij.github.io/vanilla-starter/>

**TL;DR** To find out how use this repo for your own project, go **[here](#using-this-starter-for-your-own-project)**.

This repo is provides a couple of examples of Single Page Applications (SPAs), all written in vanilla JavaScript (no libraries used). This same repo also serves as a GitHub template for generating a starter repo to build your own application based on the principles outlined in this README.

## 1. Installation

### 1.1. Install dependencies

To install the recommended ESLint and Prettier dependencies for use during development, please issue the command:

```bash
npm install
```

### 1.2 Recommended VSCode Extensions

When you load the repo folder in VSVCode, you may notice that there are some extensions that are recommended for use with this repo. Please consider installing these extensions.

## 2. Code Organization

In this starter project we present a recommended folder structure and recommendations for the design of your application code.

### 2.1 Folder Structure

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
| `src/pages` | This folder contains functions that create pages to be loaded in the UI, for instance a Home page, an About page etc. Page functions return a subtree of DOM elements and contain logic to handle user interactions and, optionally, logic for fetching data from Web APIs.<br>The actual creation and update of DOM elements is delegated a subordinate View function<sup>1</sup>.<br>In a multi-page application<sup>2</sup> a Page function is called by the router when the user navigates to the corresponding page. In a single-page application the Page function is called once only from `app.js`. |
| `src/views` | This folder contains functions called upon by Page functions to create a subtree of DOM elements and update the subtree as the application state changes. To enable user interactions, Page functions can also pass event handler functions to View functions to be added as event listeners to the View's DOM elements. |
| src/`app.js` |  This file contains the start-up code for the app. When using the router, this is where it is created and attached to the DOM. |
| `constants.js` | This file contains constants for use throughout your application. |
| src/`index.js` | This file contains the main entry point for your application. |
| src/`.credentials.js` | This file can be used to define constants for secret API keys, etc. It is listed in `.gitignore` and will therefore not be added to your repo, which is particularly important if you publish your repo on GitHub. This file is not included in the repo (exactly because it is git-ignored), but an example is provided as `.credentials.example.js` |
| `index.html` | The one and only HTML file for the application. It includes a `<div>` element that serves as the root element for our application. It also loads the `app.js` file using a `<script>` tag with a `type="module"` attribute so that you can use ES6 `import` and `export` keywords to load additional modules.

Notes:

1. In support of the principle of _Separation of Concerns_.
2. We are referring here to multiple _client-side_ pages. The application itself is still a Single Page Application, in that there is only a single HTML file, which is loaded once only. It's DOM tree is subsequently modified by means of JavaScript to make it appear as if it contains multiple pages.

## 3. Advanced Application Architecture

**_You can use the provided folder structure to build an application as you see fit without using any of the recommendations for application design described in this and the next sections. These recommendations are entirely optional._**

In the sections that follow we will outline architectural patterns and techniques that will help you to build a robust, maintainable Single Page Application, using concepts inspired by libraries/frameworks such as React and Angular.

> **Application Architecture Definition**
>
> _An application architecture describes the patterns and techniques used to design and build an application. The architecture gives you a roadmap and best practices to follow when building an application, so that you end up with a well-structured app._
>
> _Software design patterns can help you to build an application. A pattern describes a repeatable solution to a problem._
>
> Source: RedHat, [What is an application architecture?](https://www.redhat.com/en/topics/cloud-native-apps/what-is-an-application-architecture)

An application architecture also serves as a common vocabulary to communicate with other developers and teams. Those developers and teams will expect to find these rules and patterns being applied in in your application. To meet these expectations it is important for you to follow them as closely as possible.

For architecture at hand, we will outline patterns for standard Page and View functions, standard techniques for handling events and for fetching data.

Let's start with Page functions.

### 3.1 Page functions: `createXXXPage()`

A Page function creates an application page and is responsible for handling user interactions for that page. In an application that consist of a single page only there will be just one Page function. It will typically be called in the main `app.js` file where its returned DOM subtree will be added to the existing root `<div>` element in the `index.html` file.

In an application with multiple client-side pages a **router** manage the calling of a Page function whenever the user navigates to the corresponding page. After the page is created, the router loads its DOM subtree into the DOM, replacing the DOM subtree of any previous page. This somewhat advanced subject will be described in a separate README. For simple applications that consist of a single page only, not router is required.

A Page function is responsible for handling all user interactions for the page and for initiating and handling the fetching of data from Web APIs where required.The creation and updating of DOM elements is normally delegated to a companion View function, which is then called by the Page function.

The name of a Page function is prescribed by this architecture as should follow the naming convention **create**_XXX_**Page**, where _XXX_ is the name of the Page. Example: `createAboutPage`. Each Page function should be in a separate file, named `xxxPage.js`, e.g., `aboutPage.js`.

The function signature for a Page function is as follows:

> _Note: Throughout this README we will use the TypeScript syntax for presenting function definitions. This syntax is similar to the Intellisense that you can see when you hover the mouse pointer over a function header in VSCode._

```js
createXXXPage(props: object) => {
  root: HTMLElement,
  pageDidLoad?: Function,
  pageWillUnload?: Function
}
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `props` | When using a router, any parameters encoded in the browser's location url will be passed to the Page function inside a object: `{ params: [param, ...] }`. |

A Page function should return a JavaScript object with, with the following properties:

<!-- prettier-ignore -->
| Property | Required? | Description |
|----------|:---------:|-------------|
| **`root`** | Yes | Holds a reference to the `root` element of the DOM subtree created by the Page function (or created by a subordinate View function called by the Page function). |
| **`pageDidLoad`** | No | If provided, it will be called by the router just after the page is loaded. |
| **`pageWillUnload`** | No | If provided, it will be called by the router just prior unloading the page, i.e. when it is about to be replaced by a new page. |

The standard pattern for a Page function is similar to:

```js
import createFooView from '../views/fooView.js';

function createFooPage() {
  const viewProps = {
    // Add properties to be passed to the View function
  };
  const view = createFooView(viewProps);

  // Place any code needed to initialize the page, e.g. to fetch data, here.
  // ...

  // Return the object containing the View's root DOM element to the caller of / the Page function.
  return { root: view.root };
}

export default createFooPage;
```

A Page function can pass event handlers to the View function through the `viewProps` object. The View function can then add these event handlers to the target DOM elements by calling `.addEventListener()` on those elements.

```js
import createFooView from '../views/fooView.js';

function createFooPage() {
  const viewProps = { onClick: () => {...} };
  const view = createFooView(viewProps);
  return { root: view.root };
}
```

### 3.2 View functions: `createXXXView()`

The name of a View function should follow the naming convention **create**_XXX_**View**, where _XXX_ is the name of the View. Example: `createAboutView`. Each View function should be in a separate file, named `xxxView.js`, e.g., `aboutView.js`.

The function signature for a View function is as follows:

```js
createXXXView(props?: object) => { root: HTMLElement, update?: Function }
```

<!-- prettier-ignore -->
| Parameter | Description |
|-----------|-------------|
| `props`   | On object with properties that hold values and/or event handler functions to be used when creating the View's DOM subtree. |

View functions are used to create and update DOM elements in the service of corresponding Page functions or other View functions. A View function can render application data and add any event handlers passed to it through the `props` parameter. It must return an object with the following properties:

<!-- prettier-ignore -->
| Property | Required? | Description |
|----------|:---------:|-------------|
| `root` | Yes | Holds a reference to the `root` element of the DOM subtree created by the View function. |
| `update` | No | If provided, it should be a function that updates the DOM subtree with the latest application state information. |

A View function typically first creates a DOM element that represents the `root` element of the View's DOM subtree. It can then add child elements to that root through its `.innerHTML` property or through calls to `.appendChild()`.

> Warning: You should normally not use `.innerHTML` for production applications. There are potential security issues associated with its use. However, since you are expected to later switch to established libraries, such as React (which uses HTML-like syntax called JSX), we have in this starter repo opted to take advantage of the simplicity and convenience that `.innerHTML` provides for defining HTML structures.
>
> For more info on the security issues associated with `.innerHTML`, see [Security considerations](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations) on the MDN web site.

Here is an example of a simple View function.

```js
function createFooView(props) {
  const root = document.createElement('div');
  root.className = 'dialog-container';
  root.innerHTML = String.raw`
    <h1>${props.text}</h1>
  `;

  return { root };
}

export default createFooView;
```

> _Tip: There is a handy VSCode extension that adds syntax coloring to JavaScript string templates if they contain HTML code. It also adds [emmet](https://emmet.io/) support. Install this extension and then mark your HTML string templates with `String.raw` to enable the magic.<br>
> Find it here: [Visual Studio Marketplace: lit-html](https://marketplace.visualstudio.com/items?itemName=bierner.lit-html)_

Inside the View function you can access child elements the `root` element by calling `.querySelector()` on it, or by using the provided utility function `findElementsWithIds()` from the `lib` folder.

A View function may call other View functions and incorporate their root elements as child elements of its own DOM subtree.

> _What you should **not** do is access DOM element (e.g. by using `document.getElementById()` or `document.querySelector()`) outside of the View function where the DOM elements are created. This would be a violation of the architectural principles outlined here and because of it breaking the rules, introduce a potential maintenance issue. If you find yourself needing to violate this rule you probably need to rethink the way you have organized your pages and views._

#### 3.2.1 The `update()` callback

A View function can return an optional `update()` callback function that can be called to update the view after changes have been made to the application state. The application state is held in a JavaScript object that is passed as argument to the `update()` callback.

Here is a simple example:

```js
function createFooView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <input type="text" id="searchInput" placeholder="Search" />
  `;

  const input = root.querySelector('#searchInput');
  input.addEventListener('input', () => props.onInput);

  const update = (state) => {
    input.value = state.searchText || '';
  };

  return { root, update };
}
```

In this example the `update()` function is used to update the value of the `<input>` element with the value of the `searchText` property of the application state.

Here, the `input` element is completely controlled through code (in React this is called a _controlled component_). For instance, the `onInput()` event handler could ignore any leading and/or trailing spaces and convert any uppercase letters to lowercase. Then, the `input` element's value attribute is updated accordingly.

### 3.3 Page/View Interactions

Figure 1 below represents a [UML Sequence Diagram](https://en.wikipedia.org/wiki/Sequence_diagram), illustrating the interactions between the Page and View objects. In this example the application consists of a single client-side page. (Multi-page applications require the use of a client-side router and will be discussed as an advanced topic in a separate README.)

> From [Wikipedia](https://en.wikipedia.org/wiki/Sequence_diagram): _"A sequence diagram or system sequence diagram (SSD) shows object interactions arranged in time sequence in the field of software engineering. It depicts the objects involved in the scenario and the sequence of messages exchanged between the objects needed to carry out the functionality of scenario."_
>
> Note: The _"messages"_ referred to in this quotation are in our case function calls and returns.

The top three boxes in Figure 1 represent the three interacting files / ES6 modules / objects in this example.

<!-- prettier-ignore -->
| ES6 Module | Description |
|------------|-------------|
| `app.js` | Contains the application's startup code. |
| `fooPage.js` | Owns and manages the application page (named `foo` here) and handles all its user interactions. |
| `fooView.js` | Create the DOM subtree for the page and, if needed, updates its DOM elements as needed when the application state changes. |

The vertical dotted lines extending downwards from the boxes represent times lines, with rectangular (_"activation"_) blocks indicating where code from a module is actively executing.

The horizontal arrows depict function calls and returns between the interacting modules (called _"messages"_ in UML nomenclature).

![page-view-interactions](./readme-assets/app-page-view.png)<br>
Figure 1: **Page/View Interactions**

Let's now go through the various numbered steps in the diagram.

1. `app.js` contains the start-up code. It performs some initialization tasks and then calls the `createFooPage()` function imported from `fooPage.js` to create the one and only page in the application.

2. The `createFooPage()` function first sets up any view props (a JavaScript object) as needed for the View, such as event handlers for the View's DOM elements. In the diagram two event handler are shown: `onClick()` which will handle a `"click"` event and `onInput()` which will handle an `"input"` event.

   The `createFooPage()` next calls the `createFooView()` function imported from `fooView.js` to create the View, passing the event handlers as view props as illustrated in this code snippet.

   ```js
   const onClick = () => { ... };
   const onInput = () => { ... };
   const viewProps = { onClick, onInput };
   const view = createFooView(viewProps);
   ```

3. The `createFooView()` function creates the View's DOM subtree, attaches any event listener and, if needed, sets up an `update()` callback function that can be called to update the View DOM subtree whenever the application state changes.

   ```js
   function createFooView(props) {
     const root = ...

     myButton.addEventListener('click', props.onClick);
     myInput.addEventListener('input', props.onInput);

     const update = (state) => {
       ...
     };

     return { root, update }
   }
   ```

4. The `createFooView()` function returns an object with the following properties:

   <!-- prettier-ignore -->
   | Property | Description |
   |----------|-------------|
   | `root` | The `root` element of the DOM subtree created by the View function.|
   | `update` | The callback function as described above. |

5. The `createFooPage()` function, in its turn, returns an object with a single property: the `root` property from the View.

6. In `app.js`, the returned `root` element from the View's DOM subtree is inserted into the document's DOM.

7. DOM event emitted by elements from the View's DOM subtree are handled by event handlers that reside in the Page module. This separation of responsibilities is a key principle of the application architecture described here. The event handlers were passed through the `props` argument to the View function which added them as event listeners to the appropriate DOM elements. Here, a `"click"` event is handled by the `onClick()` event handler. (Similarly, an `"input"` event is handled by the `onInput()` event handler.)

8. The `onClick()` event handler inside the Page object will likely change the application state, either directly (synchronously) or perhaps by making Web API network request.

9. When the Page object updates the application state object with new or updated data it calls the `update()` function passing the updated state object an argument.

10. The View's `update()` function can then use the new application state to update, as needed, its DOM subtree.

### 3.4 Separation of Responsibilities between the Page and View

The Page function is responsible for handling all user interactions with the page. It is also responsible for updating the application state when the user interacts with the page.

The View function is responsible for creating the page's DOM subtree and updating it as needed when the application state changes.

- DOM event handlers should reside in the Page function and be passed as props to the View function.
- Network requests should be made by the Page function, either when the page is initially created or as a response to user interaction triggering a DOM event.
- All communication from the Page to View should be done by the Page function calling the `update()` function of the View, passings an updated state object as an argument.
- All communication from the View to Page should be done by means of event handlers that are passed as props to the View function.

These principles form the core of the application architecture described here.

Here is a list of examples of things that this architecture forbids:

- Access DOM elements outside of the View function itself, e.g. by using `document.getElementById()` or `document.querySelector()`.
- Handling events inside a View function itself.
- Mutating or updating the state object inside a View function. Inside a View function it should be considered readonly.
- Exporting anything other the `createXXXPage()` function from a Page module.
- Exporting anything other than the `createXXXView()` function from a View module.
- Adding more parameters than those documented here to the `createXXXPage()`, `createXXXView()` or `update()` functions.

All the example applications in this repo strictly follow these principles.

### 3.5 Fetching data in a Page function

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

  return { root: view.root };
}
```

Figure 2 below illustrates the recommended interactions between the Page and View objects when fetching data from a Web API.

![fetch-data](./readme-assets/fetch-data.png)<br>
Figure 2: **Fetching data in a Page function**

These are the steps involved:

1. The user click on a button to to retrieve data from a Web API. The `"click"` event is handled by the `onClick` event handler inside the Page function.

2. The event handler updates the state object: it set the `loading` property to `true`, the `error` property to `null` (e.g. no error yet), and the `data` property to `null` (e.g. no data yet). The Page object will then call the `update()` method of the View object with the updated state object as an argument.

3. Inside `update()` method of the View, the `loading` property is checked. If it is `true`, the View will show a loading indicator. Otherwise, it will hide it.

4. The Page object will now make a network request to try and fetch data from the Web API.

5. Some time later, the network request completes, hopefully with a successful response.

6. The Page object will then update the state object with the new data and the `loading` property set to `false`. It will call the `update()` method of the View object again with the updated state object as an argument.

7. The View will then update its DOM subtree with the new data: it will hide the loading indicator (`loading: false`) and show the data.

For a fully worked-out example inspect the [Pokemons example](src/examples/pokemons/pages/pokemonsPage.js) in this repository.

#### 3.4.1 Techniques for updating the state object

In this example, before calling `fetchData()` we update the local state object using ES7 [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

```js
state = { ...state, loading: true, error: null };
```

This statement assigns a new object to `state` variable by first spreading out its current properties and then adding the `loading` and `error` properties or overwriting them if they already existed in the `state` object: properties that are listed later in the object literal overwrite earlier ones.

```js
state = { ...state, error, loading: false };
```

Here, ES6 object shorthand notation is used for the `error` property. It is equivalent to `error: error`.

As you can see, the state object is not mutated directly. Instead, a new object is created and assigned to the `state` variable. This is a good practice which you will encounter again when you work with React.

#### 3.4.2 Handling state updates in the View

In the corresponding View function (simplified) the `update()` callback function typically handles the loading and render phases as follows:

```js
//...

const update = (state) => {
  // Show the loading indicator when the data is being fetched
  if (state.loading) {
    spinnerView.root.classList.remove('hide');
    return;
  }

  // Hide the loading indicator in any other case
  spinnerView.root.classList.add('hide');

  // In case of an error, render it and return early.
  if (state.error) {
    container.classList.remove('hide');
    container.textContent = state.error.message;
    return;
  }

  // If there is no error and we have data, we can render it.
  if (state.data) {
    // Code omitted for brevity
  }
};
```

Full implementation: [src/examples/pokemons/views/pokemonsView.js](src/examples/pokemons/views/pokemonsView.js)

## 4. Using this starter for your own project

1. In GitHub, click on the **Use this template** button to generate a repository on your own GitHub account using the files of this repo.

2. Clone the generated repo from your own GitHub account to your local computer.

3. Run `npm install` to install all the dependencies. Remember also to install the recommended VSCode extensions.

4. In `src/index.js`, uncomment the import of `./app` and comment out the import of `./examples/...`. (When you no longer need the examples, you can remove this line and remove the `examples` folder altogether.)

   ```js
   // import loadApp from './examples/menu/app.js';
   import loadApp from './app.js';
   ```

5. Load the application in your browser. You should now see the message from the Home Page: **It works!**.

6. Change the Page and View functions in the `src/pages` and `src/views` folders as required for your app.

7. In `src/index.html`, modify the contents of the `<head>` as you see fit, taking out no longer needed style sheets and adding in your own.

8. If in doubt how to achieve some specific functionality, examine the `examples` folder for possible approaches.
