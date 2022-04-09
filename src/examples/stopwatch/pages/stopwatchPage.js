import log from '../../../lib/logger.js';
import state from '../../../lib/observableState.js';
import createStopwatchView from '../views/stopwatchView.js';

function createStopwatchPage() {
  let intervalId = null;
  state.update({ time: 0 });

  const onStartClick = () => {
    intervalId = setInterval(() => {
      state.update({ time: state.get().time + 1 });
    }, 1000);
    log.debug('stopwatch', 'started');
  };

  const onStopClick = () => {
    clearTimer();
  };

  const onResetClick = () => {
    clearTimer();
    state.update({ time: 0 });
  };

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      log.debug('stopwatch', 'stopped');
    }
  };

  const viewProps = { onStartClick, onStopClick, onResetClick };
  const stopwatchView = createStopwatchView(viewProps);

  const pageDidMount = () => {
    state.subscribe(stopwatchView.update);
  };

  const pageWillUnmount = () => {
    onResetClick();
    state.unsubscribe(stopwatchView.update);
  };

  return { ...stopwatchView, pageDidMount, pageWillUnmount };
}

export default createStopwatchPage;
