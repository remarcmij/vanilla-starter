function createLandingPage() {
  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <header class="header">
    <div class="ex__header-content">
      <h3>Currency Converter</h3>
    </div>
    </header>
    <div class="ex__white-frame ex__flex-column">
      <p>This is an example application built with the Vanilla Starter.</p>
      <p>It implements a currency converter, using the <a href="https://exchangerate.host/#/">exchangerate.host</a> Web API.
      </p>
      <div>
        <a href="#ex-convert">Start</a>
        <a href="#home">Back to Examples</a>
      </div>
    </div>
  `;

  return { root };
}

export default createLandingPage;
