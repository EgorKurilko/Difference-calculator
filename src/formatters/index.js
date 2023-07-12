import stylish from './stylish.js';

import plain from './plain.js';

import json from './json.js';

export default (tree, format = stylish) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
