import logger from '../../lib/logger.js';
import createObservableState from '../../lib/observableState.js';

const state$ = createObservableState();
state$.subscribe((state) => logger.debug('state', state));

export default state$;
