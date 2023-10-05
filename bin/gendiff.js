#!/usr/bin/env node
// (шебанг) указывает на опер систему, что скрипт должен выполняться с использованием Node.js.

import { program } from 'commander';
import gendiff from '../src/index.js';
// библиотека commander предоставляет удобный способ создания CLI-интерфейсов.
// CLI - Command Line Interface

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2, program.opts().format));
  });

program.parse();
