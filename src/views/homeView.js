function createHomeView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Vanilla Starter</h3>
      </div>
    </header>
    <div class="content-container whiteframe">
      <h1>Counter: <span id="counter">0</span></h1>
      <button id="decrementBtn">Decrement</button>
      <button id="incrementBtn">Increment</button>
    </div>`;

  const counter = root.querySelector('#counter');

  const decrementBtn = root.querySelector('#decrementBtn');
  decrementBtn.addEventListener('click', props.onDecrement);

  const incrementBtn = root.querySelector('#incrementBtn');
  incrementBtn.addEventListener('click', props.onIncrement);

  const update = (state) => {
    counter.textContent = state.count;
    decrementBtn.disabled = state.count <= 0;
  };

  return { root, update };
}

export default createHomeView;
