import { getEmbedding, EmbeddingIndex } from 'client-vector-search';
import chalk from 'chalk';
import ora from 'ora';
import prompts from 'prompts';
import { table } from 'table';
import Conf from 'conf';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface StoredCommand {
    id: string;
    command: string;
    description: string;
    embedding: number[];
}

const config = new Conf<{ commands: StoredCommand[] }>({ projectName: 'hcb' });

export async function search(query?: string) {
    if (!query) {
        const response = await prompts({
            type: 'text',
            name: 'query',
            message: 'Enter your search query:',
        });
        query = response.query;
    }

    if (!query) {
        process.stdout.write(chalk.red('Search cancelled.\n'));
        return;
    }

    const spinner = ora('Searching commands...').start();

    try {
        const commands = config.get('commands', []);
        const index = new EmbeddingIndex(commands);
        const queryEmbedding = await getEmbedding(query);

        const results = await index.search(queryEmbedding, { topK: 10 });

        spinner.stop();

        if (results.length === 0) {
            process.stdout.write(chalk.yellow('No matching commands found.\n'));
            return;
        }

        const data = results.map((r, i) => [
            chalk.cyan((i + 1).toString()),
            r.object.command,
            r.object.description || '',
            chalk.green(r.similarity.toFixed(2)),
        ]);

        process.stdout.write(table([
            [chalk.bold('No.'), chalk.bold('Command'), chalk.bold('Description'), chalk.bold('Similarity')],
            ...data,
        ]) + '\n');

        const { selected } = await prompts({
            type: 'select',
            name: 'selected',
            message: 'Select a command to run:',
            choices: results.map((r, i) => ({
                title: `${i + 1}. ${r.object.command}`,
                value: r.object.command,
            })),
        });

        if (selected) {
            const execSpinner = ora(`Executing: ${chalk.bold(selected)}`).start();
            try {
                const { stdout, stderr } = await execAsync(selected);
                execSpinner.succeed(chalk.green('Command executed successfully'));
                if (stdout) process.stdout.write(stdout + '\n');
                if (stderr) process.stderr.write(chalk.red(stderr) + '\n');
            } catch (error) {
                if (error instanceof Error) {
                    execSpinner.fail(chalk.red(`Error executing command: ${error.message}`));
                } else {
                    execSpinner.fail(chalk.red(`Error executing command: ${error}`));
                }
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            spinner.fail(chalk.red(`Error searching commands: ${error.message}`));
        } else {
            spinner.fail(chalk.red(`Error searching commands: ${error}`));
        }
    }
}