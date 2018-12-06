import * as open from 'opn';

import { isNullOrEmpty, isNullOrWhitespace } from '@delta-framework/core';

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
const documentationUrl = require('../../package.json').homepage as string;

export const help = (): void => {

    const command = process.argv[2];

    console.info(isNullOrWhitespace(command) ?
        'You did not specify a command!' :
        `The command '${command}' was not recognized!`);
    console.info();
    console.info('Try one of the following commands:');
    console.info('  \'azure-keyvault-emulator [ start | stop | restart | subscribe ]\'');
    console.info();
    console.info('Or type \'azure-keyvault-emulator docs\' to ' +
        'open the documentation page in the default browser');

    return process.exit(0);
};

const docs = async (): Promise<void> => {

    console.info('Opening documentation page:', `\n  ${documentationUrl}`);
    await open(documentationUrl);

    return process.exit(0);
};

export const tryHelpCommands = async (command: string): Promise<true | void> => {

    if (isNullOrEmpty(command)) return help();
    if (command === 'help') return help();
    if (command === 'docs') return await docs();

    return true;
};