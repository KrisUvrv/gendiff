import { readFileSync } from 'node:fs';
// модуль Node.js fs (файловая система) для синхронного чтения файла с указанным путем
import path, {dirname} from 'path';
import parsers from './parsers.js';
import genDiff from './gendiff.js';
import {fileURLToPath} from "url";
import format from "./formatters/format.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  // объединяем текущий раб каталог (получ через process.cwd()) и отн путь, указ в filepath.
  // readFileSync() синхронно читает содержимое файла
  // выполнение программы будет приостановлено, пока файл не будет полностью прочитан.
  // Функция readFileSync() возвращает содержимое файла

  //const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const getData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));
  //const getData = (filepath) => readFileSync(getFixturePath(filepath));
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
