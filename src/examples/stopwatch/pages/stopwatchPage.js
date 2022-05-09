/**
 * Inspired by: https://dev.to/gspteck/create-a-stopwatch-in-javascript-2mak
 */
import logger from '../../../lib/logger.js';
import createStopwatchView from '../views/stopwatchView.js';

function createStopwatchPage() {
  let intervalId = null;
  let state = { time: 0, runState: 'reset' };

  const onStartClick = () => {
    intervalId = setInterval(() => {
      state = { ...state, time: state.time + 1 };
      view.update(state);
    }, 1000);
    state = { ...state, runState: 'running' };
    view.update(state);
  };

  const onStopClick = () => {
    clearTimer();
    state = { ...state, runState: 'stopped' };
    view.update(state);
  };

  const onResetClick = () => {
    clearTimer();
    state = { ...state, time: 0, runState: 'reset' };
    view.update(state);
  };

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      logger.debug('stopwatch', 'timer cleared');
    }
  };

  const viewProps = { onStartClick, onStopClick, onResetClick };
  const view = createStopwatchView(viewProps);

  const pageWillUnload = () => {
    onResetClick();
  };

  return { ...view, pageWillUnload };
}

export default createStopwatchPage;
