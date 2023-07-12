import formatToStylish from './stylish.js';

import formatToPlain from './plain.js';

import formatToJson from './json.js';

export default (tree, format = stylish) => {
  switch (format) {
    case 'stylish':
      return formatToStylish(tree);
    case 'plain':
      return formatToPlain(tree);
    case 'json':
      return formatToJson(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
