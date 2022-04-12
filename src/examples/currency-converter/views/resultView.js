function createResultView(props) {
  const amount = props.query.amount.toFixed(2);
  const result = props.result.toFixed(2);

  const root = document.createElement('div');
  root.innerHTML = String.raw`
    <div>
     <p>${props.query.from} ${amount} = ${props.query.to} ${result}</p>
    </div>
  `;
  return { root };
}

export default createResultView;
