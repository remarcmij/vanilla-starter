function createRepoListItem({ repo, onItemClick }) {
  const root = document.createElement('li');
  root.className = 'list-item whiteframe';

  root.innerHTML = String.raw`
    <div>
      <h4>${repo.name}</h4>
      <p>${repo.description || 'No description available.'}</p>
    </div>
    <i class="fa-solid fa-chevron-right"></i>
  `;

  root.addEventListener('click', () => onItemClick(repo));
  return { root };
}

export default createRepoListItem;
