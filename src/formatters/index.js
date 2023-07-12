import formatToStylish from './stylish.js';

import formatToPlain from './plain.js';

import formatToJson from './json.js';

export default (tree, format = formatToStylish) => {
  switch (format) {
    case 'formatToStylish':
      return formatToStylish(tree);
    case 'formatToPlain':
      return formatToPlain(tree);
    case 'formatToJson':
      return formatToJson(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
