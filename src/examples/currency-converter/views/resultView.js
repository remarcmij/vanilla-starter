function createResultView(props) {
  const amount = parseInt(props.query.amount, 10).toFixed(2);
  const result = parseInt(props.result, 10).toFixed(2);

  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <div>
     <p>${props.query.from} ${amount} = ${props.query.to} ${result}</p>
    </div>
  `;
  return { root };
}

export default createResultView;
