import { readFileSync } from 'node:fs';
import path from 'path';
import parsers from './parsers.js';
import genDiff from './gendiff.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const getFileContent = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));
  const getFormat = (filepath) => path.extname(filepath).slice(1);
  // Парсим файлы в JS-объекты
  const obj1 = parsers(getFileContent(filepath1), getFormat(filepath1));
  const obj2 = parsers(getFileContent(filepath2), getFormat(filepath2));

  const diff = genDiff(obj1, obj2);

  return format(diff, formatName);
};

export default gendiff;
