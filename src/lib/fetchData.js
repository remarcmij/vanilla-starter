/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */

import logger from './logger.js';

const HTTP_STATUS_NO_CONTENT = 204;

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

export async function fetchCached(url) {
  let data;

  data = cache[url];
  if (data) {
    logger.silly('fetchData', 'cache hit:', url);
    return data;
  }
  logger.silly('fetchData', 'cache miss:', url);

  data = fetchData(url);
  cache[url] = data;

  return data;
}
