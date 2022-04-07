import log from '../../../lib/logger.js';
import router from '../../../lib/router.js';
import createStopwatchView from '../views/stopwatchView.js';

function createStopwatchPage() {
  let intervalId = null;

  const onStartClick = () => {
    intervalId = setInterval(() => {
      router.updateState({ time: router.getState().time + 1 });
    }, 1000);
    log.debug('stopwatch', 'started');
  };

  const onStopClick = () => {
    clearTimer();
  };

  const onResetClick = () => {
    clearTimer();
    router.updateState({ time: 0 });
  };

  const onWillUnmount = () => {
    clearTimer();
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
  router.updateState({ time: 0 });

  return { ...stopwatchView, onWillUnmount };
}

export default createStopwatchPage;
