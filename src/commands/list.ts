import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { table } from 'table';
import Conf from 'conf';

interface StoredCommand {
    id: string;
    command: string;
    description: string;
    embedding: number[];
}

const config = new Conf<{ commands: StoredCommand[] }>({ projectName: 'hcb' });

export async function list() {
    const spinner = ora('Loading commands...').start();

    try {
        const commands = config.get('commands', []);
        spinner.stop();

        if (commands.length === 0) {
            process.stdout.write(chalk.yellow('No commands registered.\n'));
            return;
        }

        await displayCommands(commands);
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red(`Error listing commands: ${error.message}`));
        } else {
            spinner.fail(chalk.red(`Error listing commands: ${error}`));
        }
    }
}

async function displayCommands(commands: StoredCommand[]) {
    const pageSize = 10;
    let currentPage = 0;

    while (true) {
        const startIndex = currentPage * pageSize;
        const endIndex = startIndex + pageSize;
        const pageCommands = commands.slice(startIndex, endIndex);

        const data = pageCommands.map((cmd, i) => [
            chalk.cyan((startIndex + i + 1).toString()),
            cmd.command,
            cmd.description || '',
        ]);

        process.stdout.write(table([
            [chalk.bold('No.'), chalk.bold('Command'), chalk.bold('Description')],
            ...data,
        ]) + '\n');

        const totalPages = Math.ceil(commands.length / pageSize);
        process.stdout.write(chalk.dim(`Page ${currentPage + 1} of ${totalPages}\n`));

        const { action } = await prompts({
            type: 'select',
            name: 'action',
            message: 'Navigation:',
            choices: [
                { title: 'Next page', value: 'next', disabled: endIndex >= commands.length },
                { title: 'Previous page', value: 'prev', disabled: currentPage === 0 },
                { title: 'Exit', value: 'exit' },
            ],
        });

        if (action === 'next') {
            currentPage++;
        } else if (action === 'prev') {
            currentPage--;
        } else if (action === 'exit') {
            break;
        }

        process.stdout.write('\n');
    }
}