import fs from 'node:fs';

import path from 'node:path';

import parse from './parsers.js';

import makeTree from './makeTree.js';

import format from './formatters/index.js';

export const readFile = (filepath) => fs.readFileSync(path.resolve(filepath));

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => parse(readFile(filepath), getFormat(filepath));

const genDiff = (filepath1, filepath2, outputFormat = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const tree = makeTree(data1, data2);
  return format(tree, outputFormat);
};
export default genDiff;
