import createHomeView from '../views/homeView.js';

function createHomePage() {
  let state = { count: 0 };

  const onIncrement = () => {
    state = { ...state, count: state.count + 1 };
    view.update(state);
  };

  const onDecrement = () => {
    state = { ...state, count: state.count - 1 };
    view.update(state);
  };

  const viewProps = { onIncrement, onDecrement };
  const view = createHomeView(viewProps);

  view.update(state);

  return view;
}

export default createHomePage;
