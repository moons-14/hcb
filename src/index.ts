#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { add } from './commands/add';
import { search } from './commands/search';
import { list } from './commands/list';

const program = new Command();

console.log(chalk.cyan(figlet.textSync('HCB', { horizontalLayout: 'full' })));

program
    .version('1.0.0')
    .description('Hyper Command Browser - A modern CLI for managing and searching commands');

program
    .command('r')
    .description('Register a new command')
    .action(add);

program
    .command('search [query]')
    .description('Search for a command')
    .action(search);

program
    .command('list')
    .description('List all registered commands')
    .action(list);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}