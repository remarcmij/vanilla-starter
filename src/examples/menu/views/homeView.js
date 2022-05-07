function createHomeView() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Vanilla Starter Example Applications</h3>
      </div>
    </header>
    <div class="content-container whiteframe">
      <table style="width:100%">
        <thead>
          <tr>
            <th>Example</th>
            <th>Features</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pokemon App</td>
            <td>single page, local state</td>
            <td><a href="#pokemon">Start Pokemon App</a></td>
          </tr>
          <tr>
            <td>Currency Converter App</td>
            <td>single page, local state</td>
            <td><a href="#currency">Start Currency Converter App</a></td>
          </tr>
          <tr>
            <td>Stopwatch App</td>
            <td>multi-page, local state</td>
            <td><a href="#stopwatch">Start Stopwatch App</a></td>
          </tr>
          <tr>
            <td>GitHub App</td>
            <td>multi-page, global state</td>
            <td><a href="#gh-repos">Start GitHub App</a></td>
          </tr>
          <tr>
            <td>Nobel Prize App</td>
            <td>multi-page, global state, dynamic imports</td>
            <td><a href="#nb-prizes">Start Nobel Prize App</a></td>
          </tr>
        </tbody>
      </table>
    </div>`;

  return { root };
}

export default createHomeView;
