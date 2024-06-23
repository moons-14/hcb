import { getEmbedding, EmbeddingIndex } from 'client-vector-search';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import boxen from 'boxen';
import Conf from 'conf';

interface StoredCommand {
    id: string;
    command: string;
    description: string;
    embedding: number[];
}

const config = new Conf<{ commands: StoredCommand[] }>({ projectName: 'hcb' });

export async function add() {
    const response = await prompts([
        {
            type: 'text',
            name: 'command',
            message: 'Enter the command to register:',
        },
        {
            type: 'text',
            name: 'description',
            message: 'Enter a description for the command (optional):',
        },
    ]);

    const { command, description } = response;

    if (!command) {
        process.stdout.write(chalk.red('Command registration cancelled.\n'));
        return;
    }

    const spinner = ora('Processing command...').start();

    try {
        const embedding = await getEmbedding(command + (description || ""));
        const newCommand: StoredCommand = {
            id: Date.now().toString(),
            command,
            description: description || '',
            embedding,
        };

        const index = new EmbeddingIndex([]);
        const commands = config.get('commands', []);
        commands.push(newCommand);
        config.set('commands', commands);
        index.add(newCommand);

        spinner.succeed(chalk.green('Command added successfully'));

        process.stdout.write(boxen(
            `${chalk.bold('Command:')} ${command}\n${chalk.bold('Description:')} ${description || 'N/A'}`,
            { padding: 1, borderColor: 'green', borderStyle: 'round' }
        ) + '\n');
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red(`Failed to add command: ${error.message}`));
        } else {
            spinner.fail(chalk.red(`Failed to add command: ${error}`));
        }
    }
}