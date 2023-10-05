import _ from 'lodash';

const indent = (depth) => '    '.repeat(depth);
// создает строку, состоящую из заданного количества пробелов
const plus = '  + ';
const minus = '  - ';
const neutral = '    ';
// Эти строки представляют символы,
// которые будут использоваться для
// обозначения добавленных,
// удаленных и неизменных элементов в диффе.

const getValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  const formattedValue = keys.map((key) => `${indent(depth + 2)}${key}: ${getValue(value[key], depth + 1)}`);
  return `{\n${formattedValue.join('\n')}\n${indent(depth + 1)}}`;
};
// принимает значение value и глубину depth.
// Эта функция рекурсивно обходит структуру данных value,
// форматируя её в виде строки.
// Если value не является объектом, она просто возвращает его.
// В противном случае, она форматирует каждый ключ и значение объекта.

export default (data) => {
  const iter = (innerData, depth = 0) => {
    const formattedData = innerData.flatMap((node) => {
      if (node.type === 'ADDED') {
        return `${indent(depth)}${plus}${node.name}: ${getValue(node.value, depth)}`;
      }
      if (node.type === 'REMOVED') {
        return `${indent(depth)}${minus}${node.name}: ${getValue(node.value, depth)}`;
      }
      if (node.type === 'UNCHANGED') {
        return `${indent(depth)}${neutral}${node.name}: ${getValue(node.value, depth)}`;
      }
      if (node.type === 'CHANGED') {
        return [
          `${indent(depth)}${minus}${node.name}: ${getValue(node.oldValue, depth)}`,
          `${indent(depth)}${plus}${node.name}: ${getValue(node.newValue, depth)}`,
        ];
      }
      if (node.type === 'NESTED') {
        return `${indent(depth)}${neutral}${node.name}: ${iter(node.children, depth + 1)}`;
      }
      throw new Error(`"${node.type}" type is not supported by the formatter`);
    });

    return `{\n${formattedData.join('\n')}\n${indent(depth)}}`;
  };

  return iter(data);
};

// функция принимает data, которые представляют
// структуру данных для создания диффа.
// Внутри функции определена другая функция iter,
// которая рекурсивно обходит структуру data и
// создает текстовое представление диффа.
//
// Внутри функции iter,
// обрабатываются разные типы узлов (node) структуры данных data.
// В зависимости от типа узла (ADDED, REMOVED, UNCHANGED, CHANGED, NESTED),
// формируется соответствующая строка для диффа.
//
// Функция iter возвращает сформированный дифф как строку.


// для создания текстового представления различий между двумя структурами данных,