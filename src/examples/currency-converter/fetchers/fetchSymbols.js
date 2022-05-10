import { API_BASE_URL } from '../constants.js';
import { fetchCached } from '../../../lib/fetchData.js';

async function fetchSymbols() {
  const url = `${API_BASE_URL}/symbols`;
  return await fetchCached(url);
}

export default fetchSymbols;
