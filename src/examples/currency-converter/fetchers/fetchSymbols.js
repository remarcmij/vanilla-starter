import { API_BASE_URL } from '../constants.js';
import fetchData from '../../../lib/fetchData.js';

async function fetchSymbols() {
  const url = `${API_BASE_URL}/symbols`;
  return await fetchData(url, { cache: true });
}

export default fetchSymbols;
