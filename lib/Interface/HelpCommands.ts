import { isNullOrEmpty, isNullOrWhitespace } from '@delta-framework/core';

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
const documentationUrl = require('../../package.json').homepage as string;

/**
 * Show help documentation in console output
 */
export const help = (): void => {

    const command = process.argv[2];

    console.info(isNullOrWhitespace(command) ?
        'You did not specify a command!' :
        `The command '${command}' was not recognized or missing arguments!`);
    console.info();
    console.info('Try one of the following commands:');
    console.info('  \'azure-keyvault-emulator [ start | stop | restart | subscribe ]\'');

    return process.exit(0);
};

/**
 * Try to apply Help commands for the given command or continue
 * @param command
 */
export const tryHelpCommands = async (command: string): Promise<true | void> => {

    if (isNullOrEmpty(command)) return help();
    if (command === 'help') return help();

    return true;
};