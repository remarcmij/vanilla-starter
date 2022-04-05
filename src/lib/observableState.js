function createObservableState(state = {}) {
  let _state = state;

  const _subscribers = new Set();

  const subscribe = (subscriber) => {
    _subscribers.add(subscriber);
  };

  const unsubscribe = (subscriber) => {
    _subscribers.delete(subscriber);
  };

  const updateState = (data) => {
    const newState = { ..._state, ...data };
    _subscribers.forEach((subscriber) => subscriber(newState, _state));
    _state = newState;
    return _state;
  };

  const getState = () => {
    return _state;
  };

  return { subscribe, unsubscribe, updateState, getState };
}

export default createObservableState;
