import { readFileSync } from 'node:fs';
import path from 'path';
import parsers from './parsers.js';
import genDiff from './gendiff.js';
import format from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // объединяем текущий раб каталог (получ через process.cwd()) и отн путь, указ в filepath.
  // readFileSync() синхронно читает содержимое файла
  // выполнение программы будет приостановлено, пока файл не будет полностью прочитан.
  // Функция readFileSync() возвращает содержимое файла

  // const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const getData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));
  // Получаем формат файла
  const getFormat = (filepath) => path.extname(filepath).slice(1);
  // Парсим файлы в JS-объекты
  const obj1 = parsers(getData(filepath1), getFormat(filepath1));
  const obj2 = parsers(getData(filepath2), getFormat(filepath2));

  // Формируем diff-файл
  const diff = genDiff(obj1, obj2);

  return format(diff, formatName);
};

export default gendiff;
