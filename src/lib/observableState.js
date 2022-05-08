/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * There should be no reason to make any changes to this file.
 */
function createObservableState(initialState = {}) {
  let state = { ...initialState };

  const subscribers = new Set();

  const subscribe = (subscriber) => {
    subscribers.add(subscriber);
  };

  const unsubscribe = (subscriber) => {
    subscribers.delete(subscriber);
  };

  const update = (updates) => {
    const prevState = state;
    state = { ...prevState, ...updates };
    subscribers.forEach((subscriber) => subscriber(state, prevState));
    return state;
  };

  const get = () => {
    return state;
  };

  const set = (nextState) => {
    state = { ...nextState };
  };

  return { subscribe, unsubscribe, update, get, set };
}

export default createObservableState;
