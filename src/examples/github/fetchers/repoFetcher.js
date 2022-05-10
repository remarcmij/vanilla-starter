import { API_BASE_URL } from '../constants.js';
import { fetchCached } from '../../../lib/fetchData.js';

async function fetchRepo(owner, repoName) {
  const repo = await fetchCached(`${API_BASE_URL}/repos/${owner}/${repoName}`);
  const contributors = await fetchCached(
    `${repo.contributors_url}?per_page=100`,
    { cache: true }
  );
  return { repo, contributors };
}

export default fetchRepo;
