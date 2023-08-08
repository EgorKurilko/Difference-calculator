import { fileURLToPath } from 'url';

import { dirname } from 'path';

import fs from 'node:fs';

import path from 'node:path';

import { expect, test } from '@jest/globals';

import genDiff from '../src/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResultStylish = readFile(getFixturePath('expectedResultStylish.txt'));
const expectedResultPlain = readFile(getFixturePath('expectedResultPlain.txt'));
const expectedResultJson = readFile(getFixturePath('expectedResultJson.txt'));

const formatsFiles = ['json', 'yaml'];

test.each(formatsFiles)('diff formats of files (.json .yaml)', (extension) => {
  const fileName1 = getFixturePath(`file1.${extension}`);
  const fileName2 = getFixturePath(`file2.${extension}`);

  expect(genDiff(fileName1, fileName2, 'stylish')).toEqual(expectedResultStylish);
  expect(genDiff(fileName1, fileName2, 'plain')).toEqual(expectedResultPlain);
  expect(genDiff(fileName1, fileName2, 'json')).toEqual(expectedResultJson);
  expect(genDiff(fileName1, fileName2)).toEqual(expectedResultStylish);
});
