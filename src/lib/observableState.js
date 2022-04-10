import log from './logger.js';

function createObservableState() {
  let currentState = {};

  const subscribers = new Set();

  const subscribe = (subscriber) => {
    subscribers.add(subscriber);
  };

  const unsubscribe = (subscriber) => {
    subscribers.delete(subscriber);
  };

  const update = (updates) => {
    const newState = { ...currentState, ...updates };
    subscribers.forEach((subscriber) => subscriber(newState, currentState));
    currentState = newState;
    log.debug('state', currentState);
    return currentState;
  };

  const get = () => {
    return currentState;
  };

  return { subscribe, unsubscribe, update, get };
}

export default createObservableState;
