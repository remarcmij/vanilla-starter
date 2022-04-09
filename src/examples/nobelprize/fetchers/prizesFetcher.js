import fetchData from '../../../lib/fetchData.js';
import { BASE_URL } from '../constants.js';

function fetchPrizes(query = {}) {
  const queryString = Object.entries(query)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');
  return fetchData(`${BASE_URL}/nobelPrizes?${queryString}`, { cache: true });
}

export default fetchPrizes;
