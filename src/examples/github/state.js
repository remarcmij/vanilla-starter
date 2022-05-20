import logger from '../../lib/logger.js';
import createObservableState from '../../lib/observableState.js';

const state$ = createObservableState();

// Subscribe to log state changes to the console
state$.subscribe({
  update(state) {
    logger.debug('state', state);
  },
});

export default state$;
