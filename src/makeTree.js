import _ from 'lodash';

const makeTree = (obj1, obj2) => {
const unionKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortUnionKeys = _.sortBy(unionKeys);
  const getKeysDiff = sortUnionKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return { key, type: 'deleted', value1: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value2: obj2[key] };
    }
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      return { key, type: 'nested', children: makeTree(obj1[key], obj2[key]) };
    }
    if (!_.isEqual(obj1[key], obj2[key])) {
      return {
        key, type: 'changed', value1: obj1[key], value2: obj2[key],
      };
    }
    return { key, type: 'unchanged', value1: obj1[key] };

  });
  return getKeysDiff;
};
export default makeTree;
