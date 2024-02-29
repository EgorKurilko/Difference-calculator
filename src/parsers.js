import yaml from 'js-yaml';

/*const parse = (text, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(text);
    case 'yml':
    case 'yaml':
      return yaml.load(text);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};
export default parse; */

const mapping = {
  yaml: yaml.load,
  yml: yaml.load,
  json: JSON.parse,
};

const parse = (data, type) => mapping[type](data);

export default parse;
