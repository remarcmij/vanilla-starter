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
            <th>Example Name</th>
            <th>Features</th>
            <th>Example Code</th>
            <th>Start Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Counter</td>
            <td>single page, local state</td>
            <td><a href="https://github.com/remarcmij/vanilla-starter/tree/main/src" target="_blank">src</a></td>
            <td><a href="#counter">Counter</a></td>
          </tr>
          <tr>
            <td>Pokemons</td>
            <td>single page, local state</td>
            <td><a href="https://github.com/remarcmij/vanilla-starter/tree/main/src/examples/pokemons"        target="_blank">pokemons</a></td>
            <td><a href="#pokemon">Pokemons</a></td>
          </tr>
          <tr>
            <td>Currency Converter</td>
            <td>single page, local state</td>
            <td><a href="https://github.com/remarcmij/vanilla-starter/tree/main/src/examples/currency-converter" target="_blank">currency-convertor</a></td>
            <td><a href="#currency">Currency Converter</a></td>
          </tr>
          <tr>
            <td>Stopwatch</td>
            <td>multi-page, local state</td>
            <td><a href="https://github.com/remarcmij/vanilla-starter/tree/main/src/examples/stopwatch" target="_blank">stopwatch</a></td>
            <td><a href="#stopwatch">Stopwatch</a></td>
          </tr>
          <tr>
            <td>GitHub App</td>
            <td>multi-page, global state</td>
            <td><a href="https://github.com/remarcmij/vanilla-starter/tree/main/src/examples/github" target="_blank">github</a></td>
            <td><a href="#gh-repos">GitHub</a></td>
          </tr>
          <tr>
            <td>Nobel Prize</td>
            <td>multi-page, global state, dynamic imports</td>
            <td><a href="https://github.com/remarcmij/vanilla-starter/tree/main/src/examples/nobelprize" target="_blank">nobelprize</a></td>
            <td><a href="#nb-prizes">Nobel Prize</a></td>
          </tr>
        </tbody>
      </table>
    </div>`;

  return { root };
}

export default createHomeView;
