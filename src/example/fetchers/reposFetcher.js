import { API_BASE_URL } from '../../constants.js';
import fetchData from '../../lib/fetchData.js';

async function fetchRepos(organization) {
  const url = `${API_BASE_URL}/orgs/${organization}/repos?per_page=100`;
  const repos = await fetchData(url, { cache: true });
  repos.sort((a, b) => a.name.localeCompare(b.name));
  return repos;
}

export default fetchRepos;
