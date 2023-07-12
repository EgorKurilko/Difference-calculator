import _ from 'lodash';

const makeIndent = (depth) => {
  const replacer = ' ';
  const shiftLeft = 2;
  const spaceCount = 4;
  const indent = replacer.repeat(depth * spaceCount - shiftLeft);
  return indent;
};

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const keys = Object.keys(value);
  const getKeys = keys.map((key) => `${makeIndent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${getKeys.join('\n')}\n  ${makeIndent(depth)}}`;
};

const stylish = (objDiff) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (item, sign) => `${makeIndent(depth)}${sign} ${node.key}: ${stringify(item, depth)}\n`;
    switch (node.type) {
      case 'added':
        return getValue(node.value2, '+');
      case 'deleted':
        return getValue(node.value1, '-');
      case 'unchanged':
        return getValue(node.value1, ' ');
      case 'changed':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      case 'nested':
        return `${makeIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${makeIndent(depth)}  }\n`;
      default:
        throw new Error(`This type does not exist: ${node.type}`);
    }
  });
  return `{\n${iter(objDiff, 1).join('')}}`;
};
export default stylish;
