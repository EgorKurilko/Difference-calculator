import fs from 'node:fs';

import path from 'node:path';

import parse from './parsers.js';

import makeTree from './makeTree.js';

import format from './formatters/index.js';

export const readFile = (filepath) => fs.readFileSync(path.resolve(filepath)).toString();

const genDiff = (filepath1, filepath2, outputFormat = 'formatToStylish') => {
  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);
  const text1 = readFile(filepath1);
  const obj1 = parse(text1, format1);
  const text2 = readFile(filepath2);
  const obj2 = parse(text2, format2);

  const tree = makeTree(obj1, obj2);
  return format(tree, outputFormat);
};
export default genDiff;
