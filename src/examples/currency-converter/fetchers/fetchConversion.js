import { API_BASE_URL } from '../constants.js';
import { fetchData } from '../../../lib/fetchData.js';

async function fetchConversion(from, to, amount) {
  const url = `${API_BASE_URL}/convert?from=${from}&to=${to}&amount=${amount}`;
  return await fetchData(url);
}

export default fetchConversion;
