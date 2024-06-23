#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { add } from './commands/add';
import { search } from './commands/search';
import { list } from './commands/list';
import { config } from './commands/config';
import { reset } from './commands/reset';

const program = new Command();

console.log(chalk.cyan(figlet.textSync('HCB', { horizontalLayout: 'full' })));

program
    .version('1.0.1')
    .description('Hyper Command Browser - Save the commands you execute most often and recall them immediately!');

program
    .command('add')
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

program
    .command('config')
    .description('Display config file path and optionally open it in the default editor')
    .action(config);

program
    .command('reset')
    .description('Reset all settings')
    .action(reset);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}