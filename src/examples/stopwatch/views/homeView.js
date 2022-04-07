function createHomeView() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <h1>Stopwatch Example</h1>
    <p>This example illustrate the <code>onWillUnmount()</code> lifecycle method.</p>
    <a href="#stopwatch">Go to Stopwatch</a>
  `;
  return { root };
}

export default createHomeView;
