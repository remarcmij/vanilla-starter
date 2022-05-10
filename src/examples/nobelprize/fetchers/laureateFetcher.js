import { fetchCached } from '../../../lib/fetchData.js';
import { BASE_URL } from '../constants.js';

function fetchLaureate(id) {
  return fetchCached(`${BASE_URL}/laureate/${id}`);
}

export default fetchLaureate;
