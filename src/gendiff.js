import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  // Получение ключей объектов:
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Сортировка ключей:
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  // Создается отсортированный массив ключей, который включает в себя ключи из obj1 и obj2.
  // Это позволяет обеспечить одинаковый порядок ключей при сравнении объектов.

  // Создание массива различий:
  const diffLines = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (obj1[key] === obj2[key]) {
      return `    ${key}: ${obj1[key]}`;
    }
    return [
      `  - ${key}: ${obj1[key]}`,
      `  + ${key}: ${obj2[key]}`,
    ];
  });

  const formattedDiff = _.flatten(diffLines).join('\n');

  return `{\n${formattedDiff}\n}`;
};

export default genDiff;
