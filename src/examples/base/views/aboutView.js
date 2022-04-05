function createAboutView(props) {
  const root = document.createElement('div');
  root.className = 'centered';
  root.innerHTML = String.raw`
    <h1>About Router Starter Application</h1>
    <p>This starter application implements and demonstrates a standard 
      application architecture, featuring a hash-based router. The architecture 
      includes the following:
    </p>
    <ul>
      <li>A standard folder structure.</li>
      <li>Standards for application functions, interacting in a standard way.</li>
    </ul>
    <div class="button-container">
      <button type="button" id="btn-home">Home</a>
    </div>
  `;

  root.querySelector('#btn-home').addEventListener('click', props.onHomeClick);

  return { root };
}

export default createAboutView;
