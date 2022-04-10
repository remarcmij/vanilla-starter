import log from '../../../lib/logger.js';
import createStopwatchView from '../views/stopwatchView.js';

function createStopwatchPage() {
  let intervalId = null;
  let state = { time: 0, runState: 'reset' };

  const onStartClick = () => {
    intervalId = setInterval(() => {
      state = { ...state, time: state.time + 1 };
      stopwatchView.update(state);
    }, 1000);
    state = { ...state, runState: 'running' };
    stopwatchView.update(state);
  };

  const onStopClick = () => {
    clearTimer();
    state = { ...state, runState: 'stopped' };
    stopwatchView.update(state);
  };

  const onResetClick = () => {
    clearTimer();
    state = { ...state, time: 0, runState: 'reset' };
    stopwatchView.update(state);
  };

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      log.debug('cleared timer');
    }
  };

  const viewProps = { onStartClick, onStopClick, onResetClick };
  const stopwatchView = createStopwatchView(viewProps);

  const pageWillUnload = () => {
    onResetClick();
  };

  return { ...stopwatchView, pageWillUnload };
}

export default createStopwatchPage;
