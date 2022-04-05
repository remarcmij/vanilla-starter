function createSampleView(props) {
  const root = document.createElement('div');
  root.className = 'sample-class';
  root.innerHTML = String.raw`
    <!-- replace with your own definitions -->
  `;

  const update = (state) => {
    // Replace with your own code to handle view updates that depend on
    // the state, or remove this function altogether if no such updates
    // are required.
  };

  return { root, update };
}

export default createSampleView;
