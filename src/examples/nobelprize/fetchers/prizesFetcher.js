import { fetchCached } from '../../../lib/fetchData.js';
import { BASE_URL } from '../constants.js';

function fetchPrizes(query = {}) {
  const queryString = Object.entries(query)
    .filter(([, value]) => !!value)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');
  return fetchCached(`${BASE_URL}/nobelPrizes?${queryString}`);
}

export default fetchPrizes;
