const SECS_PER_HOUR = 3600;
const SECS_PER_MIN = 60;

function createStopwatchView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <a href="#home" class="toolbar-button">
          <i class="fa-solid fa-house"></i>
        </a>
        <div>Stopwatch</div>
      </div>
    </header>
    <div className="stopwatch-container">
      <div class="stopwatch-time">
          00:00:00
      </div>

      <ul class="stopwatch-buttons">
          <li><button id="btn-start" class="stopwatch-button">Start</button></li>
          <li><button id="btn-stop"  class="stopwatch-button">Stop</button></li>
          <li><button id="btn-reset"  class="stopwatch-button">Reset</button></li>
      </ul>
    </div>
  `;

  const stopwatch = root.querySelector('.stopwatch-time');

  root
    .querySelector('#btn-start')
    .addEventListener('click', props.onStartClick);

  root.querySelector('#btn-stop').addEventListener('click', props.onStopClick);

  root
    .querySelector('#btn-reset')
    .addEventListener('click', props.onResetClick);

  const format = (number) => number.toString().padStart(2, '0');

  const update = (state) => {
    let { time } = state;

    const hour = Math.floor(time / SECS_PER_HOUR);
    time = time % SECS_PER_HOUR;

    const min = Math.floor(time / SECS_PER_MIN);
    time = time % SECS_PER_MIN;

    const sec = time;

    stopwatch.textContent = `${format(hour)}:${format(min)}:${format(sec)}`;
  };

  return { root, update };
}

export default createStopwatchView;
