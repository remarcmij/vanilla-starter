import fetchData from '../../../lib/fetchData.js';
import { BASE_URL } from '../constants.js';

function fetchLaureate(id) {
  return fetchData(`${BASE_URL}/laureate/${id}`, { cache: true });
}

export default fetchLaureate;
