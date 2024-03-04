import yaml from 'js-yaml';

const mapping = {
  yaml: yaml.load,
  yml: yaml.load,
  json: JSON.parse,
};
const parse = (data, type) => mapping[type](data);

export default parse;
