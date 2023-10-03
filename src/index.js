import { readFileSync } from 'node:fs';
// модуль Node.js fs (файловая система) для синхронного чтения файла с указанным путем
import path from 'path';
import parser from './parser';
import genDiff from './gendiff';

const gendiff = (filepath1, filepath2) => {
  // объединяем текущий раб каталог (получ через process.cwd()) и отн путь, указ в filepath.
  // readFileSync() синхронно читает содержимое файла
  // выполнение программы будет приостановлено, пока файл не будет полностью прочитан.
  // Функция readFileSync() возвращает содержимое файла
  const getData = (filepath) => readFileSync(path.resolve(process.cwd(), filepath));
  // Получаем формат файла
  const getExtension = (filepath) => path.extname(filepath).slice(1);
  // Парсим файлы в JS-объекты
  const obj1 = parser(getData(filepath1), getExtension(filepath1));
  const obj2 = parser(getData(filepath2), getExtension(filepath2));

  // Формируем diff-файл
  const diff = genDiff(obj1, obj2);
  return diff;
};

export default gendiff;
