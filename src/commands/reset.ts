import Conf from 'conf';
import chalk from 'chalk';
import prompts from 'prompts';

const config = new Conf({ projectName: 'hcb' });

export async function reset() {
    const { confirm } = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure you want to reset all settings? This action cannot be undone.',
        initial: false
    });

    if (confirm) {
        config.clear();
        process.stdout.write(chalk.green('All settings have been reset.\n'));
    } else {
        process.stdout.write(chalk.yellow('Reset cancelled.\n'));
    }
}