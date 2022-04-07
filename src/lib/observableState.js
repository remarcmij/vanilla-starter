import log from './logger.js';

function createObservableState(state = {}) {
  let _state = state;

  const _subscribers = new Set();

  const subscribe = (subscriber) => {
    _subscribers.add(subscriber);
  };

  const unsubscribe = (subscriber) => {
    _subscribers.delete(subscriber);
  };

  const update = (data) => {
    const newState = { ..._state, ...data };
    _subscribers.forEach((subscriber) => subscriber(newState, _state));
    _state = newState;
    log.debug('state', _state);
    return _state;
  };

  const get = () => {
    return _state;
  };

  return { subscribe, unsubscribe, update, get };
}

export default createObservableState;
