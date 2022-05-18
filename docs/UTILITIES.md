# 1. Miscellaneous Utility Functions

A couple of ready-made utility functions are provided in the `src/lib` folder for use in your own application.

Note: the modules [`router.js`](ROUTER.md) and [`observableState.js`](STATE.md) are described in elsewhere in this repository.

## 1. `loadPage()`

File: [src/lib/pageLoader.js](../src/lib/pageLoader.js)

A simple alternative to the Router for loading pages into the DOM. It takes a Page function as an argument. It calls that function to create the page and mounts the returned DOM subtree from the page's root element at the pre-existing `<div id="page-root">` from `index.html`, replacing any previous page.

If provided in the Page object, it will call the `onPageDidLoad()` and `onPageWillUnload()` life cycle methods.

```js
function loadPage(createPageFn: () => void): void
```

## 2. `fetchData()`

Fetches JSON data from the specified URL. It checks `res.ok` and throws an error if it is `false`. In case of a `204 No Content` response, it returns `null`.

File: [src/lib/fetchData.js](../src/lib/fetchData.js)

```js
function fetchData(url: string): Promise<any>
```

## 3. `fetchCached()`

File: [src/lib/fetchData.js](../src/lib/fetchCached.js)

Builds upon `fetchData()` as described above, but now caches the data in a local cache, using the url as the key. Periodically prunes the cache to remove older entries.

Use this function in preference over `fetchData()` when you expect to do repeated fetches of the same data and you know this data to remain unchanged for the duration of the application session.

```js
function fetchCached(url: string): Promise<any>
```

## 4. `logger.XXX()`

File: [src/lib/logger.js](../src/lib/logger.js)

You can use this family of log methods to log information to the developer console.

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

Log messages with a level below the `minLevel` will not show up.

Example usage: [src/examples/stopwatch/pages/stopwatchPage.js](src/examples/stopwatch/pages/stopwatchPage.js)

## 5. `findElementsWithIds()`

File: [src/lib/findElementsWithIds.js](../src/lib/findElementsWithIds.js)

This function can be used in View functions to quickly find all DOM elements in the View's subtree that have an `id` attribute.

```ts
findElementsWithIds(root: HTMLElement) => object
```

It takes a single parameter, the root of the subtree to search (normally `root`). It returns an object of DOM elements with their `id` attributes as keys. To enable the convenient dot notation for property access it is recommended to use `camelCase` for the `id` attributes instead of the usual `kebab-case`.

Example usage: [src/examples/github-2/views/toolbarView.js](src/examples/github-2/views/toolbarView.js)
