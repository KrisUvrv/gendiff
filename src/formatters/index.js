import stylish from './stylish';
import plain from './plain';
import json from './json';

const formatters = { stylish, plain, json };
// formatters - это объект,
// в котором ключи соответствуют именам
// форматтеров (stylish, plain, и json),
// а значения - сами форматтеры (функции).

export default (diff, formatName) => formatters[formatName](diff);

// этот код позволяет динамически
// выбирать форматтер вывода в зависимости
// от значения formatName, что делает его
// очень гибким и позволяет легко добавлять
// новые форматтеры или менять формат вывода
// без изменения основной логики кода.
