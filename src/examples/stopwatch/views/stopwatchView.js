import getElementRefs from '../../../lib/getElementRefs.js';
import log from '../../../lib/logger.js';

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
        <h3>Stopwatch</h3>
      </div>
    </header>
    <div class="content-container whiteframe flex-column">
      <div class="stopwatch-time" id="time">
          00:00:00
      </div>

      <ul class="stopwatch-buttons list-no-bullets">
          <li><button id="startBtn" class="stopwatch-button">Start</button></li>
          <li><button id="stopBtn"  class="stopwatch-button" disabled>Stop</button></li>
          <li><button id="resetBtn"  class="stopwatch-button" disabled>Reset</button></li>
      </ul>
    </div>
  `;

  const dom = getElementRefs(root);

  dom.startBtn.addEventListener('click', props.onStartClick);
  dom.stopBtn.addEventListener('click', props.onStopClick);
  dom.resetBtn.addEventListener('click', props.onResetClick);

  const format = (number) => number.toString().padStart(2, '0');

  const updateTime = ({ time }) => {
    const hour = Math.floor(time / SECS_PER_HOUR);
    time = time % SECS_PER_HOUR;

    const min = Math.floor(time / SECS_PER_MIN);
    time = time % SECS_PER_MIN;

    const sec = time;

    dom.time.textContent = `${format(hour)}:${format(min)}:${format(sec)}`;
  };

  const updateButtons = ({ runState }) => {
    switch (runState) {
      case 'running':
        dom.startBtn.disabled = true;
        dom.stopBtn.disabled = false;
        dom.resetBtn.disabled = false;

        break;
      case 'stopped':
        dom.startBtn.disabled = false;
        dom.stopBtn.disabled = true;
        dom.resetBtn.disabled = false;
        break;

      case 'reset':
        dom.startBtn.disabled = false;
        dom.stopBtn.disabled = true;
        dom.resetBtn.disabled = true;
        break;
    }
  };

  const update = (state) => {
    log.debug('state', state);
    updateTime(state);
    updateButtons(state);
  };

  return { root, update };
}

export default createStopwatchView;
