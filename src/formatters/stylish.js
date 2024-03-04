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

const getValue = (item, sign) => `${makeIndent(depth)}${sign} ${node.key}: ${stringify(item, depth)}\n`;

const iter = (tree, depth) => tree.map((node) => {
  return mapping[node.type](node, depth, makeIndent, iter);
});

const mapping = {
  added: (node) => getValue(node.value2, '+'),
  deleted: (node) => getValue(node.value1, '-'),
  unchanged: (node) => getValue(node.value1, ' '),
  changed: (node) => `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`,
  nested: (depth, node) => `${makeIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${makeIndent(depth)}  }\n`,
};
const formatStylish = (objDiff) => {
  return `{\n${iter(objDiff, 1).join('')}}`;
};
export default formatStylish;
