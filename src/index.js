import _ from 'lodash';

import fs from 'node:fs';

import path from 'node:path';

const compareObjects = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const keyDiffs = keys.map((key) => {
    if (
      _.has(obj1, key)
      && _.has(obj2, key)
      && !_.isEqual(obj1[key], obj2[key])
    ) {
      return [
        `  - ${key}: ${obj1[key]}`,
        `  + ${key}: ${obj2[key]}`,
      ].join('\n');
    }
    if (!_.has(obj2, key)) {
      return [`  - ${key}: ${obj1[key]}`].join('\n');
    }
    if (!_.has(obj1, key)) {
      return [`  + ${key}: ${obj2[key]}`].join('\n');
    }
    return [`    ${key}: ${obj1[key]}`].join('\n');
  });

  return `{\n${
    keyDiffs.join('\n')
  }\n}`;
};

const genDiff = (filepath1, filepath2) => {
  const absPath1 = path.resolve(filepath1);
  const text1 = fs.readFileSync(absPath1);
  const obj1 = JSON.parse(text1);

  const absPath2 = path.resolve(filepath2);
  const text2 = fs.readFileSync(absPath2);
  const obj2 = JSON.parse(text2);

  return compareObjects(obj1, obj2);
};

export default genDiff;
