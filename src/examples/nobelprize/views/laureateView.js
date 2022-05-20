import findElementsWithIds from '../../../lib/findElementsWithIds.js';
import createSpinnerView from './spinnerView.js';

function createLaureateView(props) {
  const { category = 'all', year = 'all', page = '1', awardYear } = props;
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <a href="#nb-prizes/${category}/${year}/${page}" class="toolbar-button">
          <i class="fa-solid fa-chevron-left"></i>
        </a>        
        <h3>Nobel Laureate</h3>
      </div>
    </header>
    <div id="laureateContainer"></div>
  `;

  const laureateContainer = root.querySelector('#laureateContainer');

  const spinnerView = createSpinnerView();
  root.appendChild(spinnerView.root);

  const update = (state) => {
    if (state.loading) {
      spinnerView.root.classList.remove('hide');
      return;
    }

    spinnerView.root.classList.add('hide');

    if (state.error) {
      return;
    }

    laureateContainer.innerHTML = String.raw`
      <div class="content-container whiteframe">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td id="name"></td>
            </tr>
            <tr>
              <th>Born</th>
              <td id="born">N/A</td>
            </tr>
            <tr id="diedRow">
              <th>Died</th>
              <td id="died">N/A</td>
            </tr>
            <tr>
              <th>Category</th>
              <td id="category">N/A</td>
            </tr>          
            <tr>
              <th>Award Year</th>
              <td id="awardYear">N/A</td>
            </tr>
            <tr>
              <th>Motivation</th>
              <td id="motivation"></td>
            </tr>
            <tr>
              <th>Other Prizes</th>
              <td id="otherPrizes">None</td>
            </tr>
            <tr>
              <th>Wikipedia</th>
              <td id="wikipedia">Not available</td>
            </tr>

          </tbody>
        </table>
      </div>`;

    const dom = findElementsWithIds(laureateContainer);

    const { laureate } = state;
    dom.name.textContent = laureate.orgName
      ? laureate.orgName.en
      : laureate.fullName.en;

    if (laureate.birth) {
      dom.born.textContent = `${laureate.birth.date}, ${laureate.birth.place.locationString.en}`;
    }

    if (laureate.death) {
      dom.died.textContent = `${laureate.death.date}, ${laureate.death.place.locationString.en}`;
    } else {
      dom.diedRow.classList.add('hide');
    }

    const nobelPrize = laureate.nobelPrizes.find(
      (p) => p.awardYear === awardYear
    );

    if (nobelPrize) {
      dom.category.textContent = nobelPrize.category.en;
      dom.awardYear.textContent = awardYear;
      dom.motivation.innerHTML = `${nobelPrize.categoryFullName.en}, ${nobelPrize.motivation.en}.`;
    }

    const otherPrizes = laureate.nobelPrizes.filter(
      (p) => p.awardYear !== awardYear
    );
    if (otherPrizes.length > 0) {
      dom.otherPrizes.textContent = otherPrizes
        .map((p) => `${p.categoryFullName.en} (${p.awardYear})`)
        .join(', ');
    }

    if (laureate.wikipedia) {
      dom.wikipedia.innerHTML = `
        <a href="${laureate.wikipedia.english}" target="_blank">
          ${laureate.wikipedia.slug}
        </a>`;
    }
  };

  return { root, update };
}

export default createLaureateView;
