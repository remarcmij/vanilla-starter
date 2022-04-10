import log from '../../lib/logger.js';
import createObservableState from '../../lib/observableState.js';

const state$ = createObservableState();

// Subscribe to log state changes to the console
state$.subscribe((state) => {
  log.debug('state', state);
});

export default state$;
