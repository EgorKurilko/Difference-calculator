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

const iter = (tree, depth) => tree.map((node) => {
  const getValue = (item, sign) => `${makeIndent(depth)}${sign} ${node.key}: ${stringify(item, depth)}\n`;
  const mapping = {
    added: () => getValue(node.value2, '+'),
    deleted: () => getValue(node.value1, '-'),
    unchanged: () => getValue(node.value1, ' '),
    changed: () => `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`,
    nested: () => `${makeIndent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${makeIndent(depth)}  }\n`,
  };
  return mapping[node.type](node, depth, makeIndent, iter);
});

const formatStylish = (objDiff) => `{\n${iter(objDiff, 1).join('')}}`;

export default formatStylish;
