### Hexlet tests and linter status:
[![Actions Status](https://github.com/KrisUvrv/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/KrisUvrv/frontend-project-46/actions)

<a href="https://codeclimate.com/github/KrisUvrv/frontend-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/88bc33bacf45e88fbdab/test_coverage" /></a>

Описание:
- Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Возможности утилиты:
- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

Пример использования:
- # формат plain
gendiff --format plain path/to/file.yml another/path/file.json

- # формат stylish
gendiff filepath1.json filepath2.json

Установка:

- git clone 
- make install
- npm link
