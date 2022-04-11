function findElementsWithIds(root) {
  const elements = root.querySelectorAll('[id]');
  return Array.from(elements).reduce((obj, element) => {
    obj[element.id] = element;
    return obj;
  }, {});
}

export default findElementsWithIds;
