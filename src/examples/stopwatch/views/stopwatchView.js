import findElementsWithIds from '../../../lib/findElementsWithIds.js';
import logger from '../../../lib/logger.js';

const SECS_PER_HOUR = 3600;
const SECS_PER_MIN = 60;

function createStopwatchView(props) {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
      <div class="header-content">
        <h3>Stopwatch</h3>
        <span class="spanner"></span>
        <p><a href="#about-stopwatch">About</a></p>
      </div>
    </header>
    <div class="content-container whiteframe flex-column">
      <div class="st__stopwatch-time" id="timeDiv">
          00:00:00
      </div>

      <ul class="st__stopwatch-buttons list-no-bullets">
          <li><button id="startBtn" class="st__stopwatch-button">Start</button></li>
          <li><button id="stopBtn"  class="st__stopwatch-button" disabled>Stop</button></li>
          <li><button id="resetBtn"  class="st__stopwatch-button" disabled>Reset</button></li>
      </ul>
    </div>
  `;

  const { startBtn, stopBtn, resetBtn, timeDiv } = findElementsWithIds(root);

  startBtn.addEventListener('click', props.onStartClick);
  stopBtn.addEventListener('click', props.onStopClick);
  resetBtn.addEventListener('click', props.onResetClick);

  const format = (number) => number.toString().padStart(2, '0');

  const updateTime = ({ time }) => {
    const hour = Math.floor(time / SECS_PER_HOUR);
    time = time % SECS_PER_HOUR;

    const min = Math.floor(time / SECS_PER_MIN);
    time = time % SECS_PER_MIN;

    const sec = time;

    timeDiv.textContent = `${format(hour)}:${format(min)}:${format(sec)}`;
  };

  const updateButtons = ({ runState }) => {
    switch (runState) {
      case 'running':
        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = false;

        break;
      case 'stopped':
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        break;

      case 'reset':
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
        break;
    }
  };

  const update = (state) => {
    logger.debug('state', state);
    updateTime(state);
    updateButtons(state);
  };

  return { root, update };
}

export default createStopwatchView;
