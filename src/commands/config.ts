import Conf from 'conf';
import chalk from 'chalk';
import prompts from 'prompts';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const _config = new Conf({ projectName: 'hcb' });

export async function config() {
    process.stdout.write(chalk.cyan(`Config file path: ${_config.path}\n`));

    const { shouldOpen } = await prompts({
        type: 'confirm',
        name: 'shouldOpen',
        message: 'Do you want to open the config file in your default editor?',
        initial: false
    });

    if (shouldOpen) {
        try {
            if (process.platform === 'win32') {
                await execAsync(`start ${_config.path}`);
            } else {
                await execAsync(`open ${_config.path}`);
            }
            process.stdout.write(chalk.green('Config file opened in your default editor.\n'));
        } catch (error) {
            if (error instanceof Error) {
                process.stderr.write(chalk.red(`Failed to open config file: ${error.message}\n`));
            } else {
                process.stderr.write(chalk.red(`Failed to open config file: ${error}\n`));
            }
        }
    }
}