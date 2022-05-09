# Vanilla Starter Project

This repo is provides a couple of examples of Single Page Applications (SPAs), all written in vanilla JavaScript (no libraries used). This same repo also serves as a GitHub template for generating a starter repo to build your own application based on the principles outlined in this README.

Live demo: <https://remarcmij.github.io/vanilla-starter/>

**TL;DR** To find out how use this repo for your own project, go **[here](#4-using-this-starter-for-your-own-project)**.

## 1. Installation

### 1.1. Install dependencies

To install the recommended ESLint and Prettier dependencies for use during development, please issue the command:

```bash
npm install
```

### 1.2 Recommended VSCode Extensions

When you load the repo folder in VSCode, you may notice that there are some extensions that are recommended for use with this repo. Please consider installing these extensions.

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

## 3. Further Reading

<!-- prettier-ignore -->
| Level | Description | Document |
|------------|-------------|----------|
|  Essential | Defines the **Application Architecture** used throughout this starter repo. | [Architecture](docs/ARCHITECTURE.md) |
| Advanced | How to add multi-page support using the **Router**.  | [Router](docs/ROUTER.md) |
| Advanced | How to manage global application state using **Observable State**. | [State](docs/STATE.md) |

## 4. Using this Starter for Your Own Project

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
