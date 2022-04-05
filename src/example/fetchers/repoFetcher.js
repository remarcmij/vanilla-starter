import { API_BASE_URL } from '../../constants.js';
import fetchData from '../../lib/fetchData.js';

async function fetchRepo(owner, repoName) {
  const repo = await fetchData(`${API_BASE_URL}/repos/${owner}/${repoName}`, {
    cache: true,
  });
  const contributors = await fetchData(
    `${repo.contributors_url}?per_page=100`,
    { cache: true }
  );
  return { repo, contributors };
}

export default fetchRepo;
