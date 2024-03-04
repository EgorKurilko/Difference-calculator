const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const mapping = {
  added: (property, node) => `Property '${property}' was added with value: ${stringify(node.value2)}`,
  deleted: (property) => `Property '${property}' was removed`,
  changed: (property, node) => `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`,
  nested: (property, node, format) => `${format(node.children, property)}`,
};
const formatPlain = (tree) => {
  const format = (nodes, parent) => nodes
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      return mapping[node.type](property, node, format);
    }).join('\n');
  return format(tree, null);
};
export default formatPlain;
