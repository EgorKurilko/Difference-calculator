import _ from 'lodash';

const makeTree = (data1, data2) => {
  const unionKeys = _.union(_.keys(data1), _.keys(data2));
  const sortUnionKeys = _.sortBy(unionKeys);
  const keysDiff = sortUnionKeys.map((key) => {
    if (!_.has(data2, key)) {
      return { key, type: 'deleted', value1: data1[key] };
    }
    if (!_.has(data1, key)) {
      return { key, type: 'added', value2: data2[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: makeTree(data1[key], data2[key]) };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }
    return { key, type: 'unchanged', value1: data1[key] };
  });
  return keysDiff;
};
export default makeTree;
