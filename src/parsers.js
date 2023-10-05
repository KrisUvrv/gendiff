import yaml from 'js-yaml';

// функция для разбора (парсинга) данных в формате JSON или YAML

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, format) => parsers[format](data);
