/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

import logger from './logger.js';

const HTTP_STATUS_NO_CONTENT = 204;

/**
 * Fetch JSON data from the given URL.
 * @param {string} url
 */
export async function fetchData(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}  ${res.statusText}`);
  }

  let data = null;
  if (res.status !== HTTP_STATUS_NO_CONTENT) {
    data = await res.json();
  }

  return data;
}

const cache = {};
const CACHE_INTERVAL_MSECS = 5000;
const CACHE_MAX_AGE_MSECS = 1000 * 60 * 60; // 1 hour

/**
 * Fetch JSON data from the given URL, caching the result.
 * @param {string} url
 */
export async function fetchCached(url) {
  const node = cache[url];
  if (node) {
    logger.silly('fetchData', 'cache hit:', url);
    return node.value;
  }
  logger.silly('fetchData', 'cache miss:', url);

  const data = fetchData(url);
  cache[url] = { time: new Date(), value: data };

  return data;
}

// Adapted from: https://dev.to/rajeshroyal/cache-api-in-javascript-with-just-20-lines-of-code-49kg
setInterval(function () {
  if (Object.keys(cache).length > 0) {
    const now = Date.now();
    Object.keys(cache).forEach((key) => {
      const msecs = now - cache[key].time;

      if (msecs > CACHE_MAX_AGE_MSECS) {
        delete cache[key];
        logger.silly('fetchData', `${key}'s cache deleted`);
      }
    });
  }
}, CACHE_INTERVAL_MSECS);
