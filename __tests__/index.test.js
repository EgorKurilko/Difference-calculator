import { expect, test } from '@jest/globals';

import { fileURLToPath } from 'url';

import { dirname } from 'path';

import path from 'node:path';

import genDiff, { readFile } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedResultStylish = readFile(getFixturePath('expectedResultStylish.txt'));
const expectedResultPlain = readFile(getFixturePath('expectedResultPlain.txt'));
const expectedResultJson = readFile(getFixturePath('expectedResultJson.txt'));

test('gendiff json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')))
    .toEqual(expectedResultStylish);
});

test('gendiff yaml', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml')))
    .toEqual(expectedResultStylish);
});

test('gendiff yml', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml')))
    .toEqual(expectedResultStylish);
});

test('gendiff json.plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain'))
    .toEqual(expectedResultPlain);
});

test('gendiff yaml.plain', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain'))
    .toEqual(expectedResultPlain);
});

test('gendiff yml.plain', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain'))
    .toEqual(expectedResultPlain);
});

test('gendiff json.json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json'))
    .toEqual(expectedResultJson);
});

test('gendiff yaml.json', () => {
  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json'))
    .toEqual(expectedResultJson);
});

test('gendiff yml.json', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json'))
    .toEqual(expectedResultJson);
});
