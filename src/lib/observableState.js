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
    return currentState;
  };

  const get = () => {
    return currentState;
  };

  return { subscribe, unsubscribe, update, get };
}

const observableState = createObservableState();
export default observableState;
