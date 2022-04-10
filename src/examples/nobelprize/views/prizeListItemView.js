function createPrizeListItemView(props) {
  const { prize } = props;

  const root = document.createElement('li');
  root.className = 'prize-list-item list-item whiteframe';
  root.innerHTML = String.raw`
    <table>
      <tbody>
        <tr>
          <th>Year:</th>
          <td>${prize.awardYear}</td>
        </tr>
        <tr>
          <th>Category:</th>
          <td>${prize.category.en}</td>
        </tr>
        <tr>
          <th>Laureates:</th>
          <td id="laureatesContainer"></td>
        </tr>
      </tbody>
    </table>
  `;

  const laureatesContainer = root.querySelector('#laureatesContainer');

  if (!prize.laureates) {
    // No laureates
    laureatesContainer.textContent = prize.topMotivation.en;
  } else {
    prize.laureates.forEach((laureate, index) => {
      if (index > 0) {
        const span = document.createElement('span');
        span.textContent = ', ';
        laureatesContainer.appendChild(span);
      }
      const link = document.createElement('a');
      link.textContent = laureate.orgName
        ? laureate.orgName.en
        : laureate.knownName.en;
      link.href = `#nb-laureate/${laureate.id}/${prize.awardYear}`;
      laureatesContainer.appendChild(link);
    });
  }

  return { root };
}

export default createPrizeListItemView;
