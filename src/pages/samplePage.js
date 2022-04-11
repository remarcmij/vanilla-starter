import createSampleView from '../views/sampleView.js';

function createSamplePage() {
  const viewProps = {
    // Add properties to be passed to the View function
  };

  return createSampleView(viewProps);
}

export default createSamplePage;
