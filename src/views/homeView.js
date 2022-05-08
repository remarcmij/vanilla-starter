function createHomeView() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Vanilla Starter</h3>
      </div>
    </header>
    <div class="content-container whiteframe">
      <h1>It works!</h1>
    </div>`;

  return { root };
}

export default createHomeView;
