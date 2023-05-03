#!/usr/bin/env node

import { program } from 'commander';

const gendiff = (filepath1, filepath2) => gendiff(filepath1, filepath2);

program
  .name('string-util')
  .description('Инструмент для работы со строками')
  .version('1.0.0');

program.command('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'первый файл')
  .argument('<filepath2>', 'второй файл')
  .option('-h, --help', 'display help for command')
  .option('-V, --version', 'output the version number')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
