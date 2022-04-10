import fetchData from '../../../lib/fetchData.js';

async function fetchContributors(repo) {
  const contributors = await fetchData(
    `${repo.contributors_url}?per_page=100`,
    { cache: true }
  );
  return contributors;
}

export default fetchContributors;
