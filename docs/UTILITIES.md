# 1. Miscellaneous Utility Functions

A couple of other ready-made utility functions are provided in the `src/lib` folder that you may want to consider to use in your own application.

## 1. Function: `fetchData()`

TODO: separate fetchCached() function

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

## 2. Function: `findElementsWithIds()`

File: [src/lib/findElementsWithIds.js](src/lib/findElementsWithIds.js)

```ts
findElementsWithIds(root: HTMLElement) => object
```

This function can be used in View functions to quickly find all DOM elements in the View's subtree that have an `id` attribute. It takes a singe parameter, the root of the subtree to search (normally `root`). It returns an object of DOM elements with the `id` as the key and the DOM element as the value. To enable dot notation to access properties of the object it is recommended to use _camelCase_ for the `id` attributes of the DOM elements instead of the usual _kebab-case_.

Example usage: [src/examples/github-2/views/toolbarView.js](src/examples/github-2/views/toolbarView.js)

## 3. Function: `logger.XXX()`

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
