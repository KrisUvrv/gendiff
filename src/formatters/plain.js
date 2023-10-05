import _ from 'lodash';

const getFormattedValue = (value) => {
  if (!_.isObject(value)) {
    const formattedValue = _.isString(value) ? `'${value}'` : `${value}`;
    return formattedValue;
  }

  return '[complex value]';
};

// Эта функция getFormattedValue принимает значение value
// и возвращает его в формате, пригодном для вывода в текст.
// Если значение не является объектом
// (например, строкой, числом или булевым значением),
// то оно просто преобразуется в строку.
// Если значение является строкой,
// то оно заключается в одинарные кавычки.
// В случае, если значение является объектом
// или другим сложным типом данных,
// функция возвращает строку '[complex value]'.

export default (data) => {
  const iter = (innerData, path = []) => {
    const formattedData = innerData.map((node) => {
      const pathElements = [...path, node.name];
      const actualPath = pathElements.join('.');
      if (node.type === 'ADDED') {
        return `Property '${actualPath}' was added with value: ${getFormattedValue(node.value)}`;
      }
      if (node.type === 'REMOVED') {
        return `Property '${actualPath}' was removed`;
      }
      if (node.type === 'CHANGED') {
        return `Property '${actualPath}' was updated. From ${getFormattedValue(node.oldValue)} to ${getFormattedValue(node.newValue)}`;
      }
      if (node.type === 'NESTED') {
        return `${iter(node.children, pathElements)}`;
      }
      if (node.type === 'UNCHANGED') {
        return null;
      }
      throw new Error(`"${node.type}" type is not supported by the formatter`);
    })
      .filter((elem) => elem !== null);

    return `${formattedData.join('\n')}`;
  };

  return iter(data);
};

// функция принимает структуру данных data,
// представляющую различия между двумя версиями объектов.
// Функция iter является рекурсивной,
// и она выполняет обход структуры данных.
//
// innerData - это массив объектов,
// представляющих различия в текущем уровне.

// path - это массив строк,
// представляющий путь к текущему уровню вложенности.

// Функция formattedData используется
// для преобразования объектов различий в массив строк,
// каждая из которых представляет конкретное изменение.
// В зависимости от типа изменения (node.type),
// функция генерирует соответствующее сообщение:
//
// Если тип ADDED, функция сообщает,
// что свойство было добавлено и выводит значение
// с использованием getFormattedValue.

// Если тип REMOVED, функция сообщает, что свойство было удалено.
// Если тип CHANGED, функция сообщает,
// что свойство было обновлено
// и выводит старое и новое значения
// с использованием getFormattedValue.

// Если тип NESTED, функция рекурсивно
// вызывает себя для вложенных данных.

// Если тип UNCHANGED, функция возвращает null,
// чтобы не генерировать сообщение.

// Затем результаты фильтруются,
// чтобы удалить null значения,
// и объединяются в одну большую строку
// с разделителем \n для удобного вывода.
//
// функция преобразует структуру различий
// в текстовое описание этих различий в удобочитаемом формате.
