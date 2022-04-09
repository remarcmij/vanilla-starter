function createSpinnerView() {
  const root = document.createElement('div');
  root.className = 'spinner';
  root.innerHTML = String.raw`
    <div class="spin">
      <i class="fa-solid fa-spinner fa-2xl"></i>
    </div>
  `;

  return { root };
}

export default createSpinnerView;
