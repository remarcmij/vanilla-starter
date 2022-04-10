import createContributorListItemView from './contributorListItemView.js';

function createContributorListView(props) {
  const root = document.createElement('section');
  root.className = 'contributors-container whiteframe';

  root.innerHTML = String.raw`
    <div class="contributor-header">Contributions</div>
    <ul class="list-no-bullets"></ul>
  `;

  const ul = root.querySelector('.list-no-bullets');

  if (props.contributors) {
    props.contributors.forEach((contributor) => {
      const listItemView = createContributorListItemView({ contributor });
      ul.appendChild(listItemView.root);
    });
  }

  return { root };
}

export default createContributorListView;
