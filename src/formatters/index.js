import formatStylish from './stylish.js';

import formatPlain from './plain.js';

import formatJson from './json.js';

/* export default (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return formatStylish(tree);
    case 'plain':
      return formatPlain(tree);
    case 'json':
      return formatJson(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
}; */

const mapping = {
  stylish: (tree) => formatStylish(tree),
  plain: (tree) => formatPlain(tree),
  json: (tree) => formatJson(tree),
};

const parse = (data, type) => mapping[type](data);

export default parse;
