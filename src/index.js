import fs from 'node:fs';

import path from 'node:path';

import parse from './parsers.js';

import makeTree from './makeTree.js';

import format from './formatters/index.js';

export const readFile = (filepath) => fs.readFileSync(path.resolve(filepath)).toString();

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getObj = (filepath) => parse(readFile(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const obj1 = getObj(filepath1);
  const obj2 = getObj(filepath2);
  const tree = makeTree(obj1, obj2);
  return format(tree, outputFormat);
};
export default genDiff;
