import log from '../../../lib/logger.js';
import createStopwatchView from '../views/stopwatchView.js';
import createObservableState from '../../../lib/observableState.js';

const state = createObservableState({ time: 0 });

function createStopwatchPage() {
  let intervalId = null;

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
    stopwatchView.update(state);
  };

  const clearTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      log.debug('stopwatch', 'stopped');
    }
  };

  const props = { onStartClick, onStopClick, onResetClick };
  const stopwatchView = createStopwatchView(props);

  const pageDidMount = () => {
    state.subscribe(stopwatchView.update);
  };

  const pageWillUnmount = () => {
    clearTimer();
    state.unsubscribe(stopwatchView.update);
  };

  return { ...stopwatchView, pageDidMount, pageWillUnmount };
}

export default createStopwatchPage;
