import * as open from 'opn';

import { isNullOrEmpty } from '@delta-framework/core';

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
const documentationUrl = require('../../package.json').homepage as string;

export const help = (): void => {

    // todo console help
    console.info('helptext');
};

const docs = async (): Promise<void> => {

    console.info('Opening documentation page:', `\n  ${documentationUrl}`);
    await open(documentationUrl);
};

export const tryHelpCommands = async (command: string): Promise<true | void> => {

    if (isNullOrEmpty(command)) return help();
    if (command === 'help') return help();
    if (command === 'docs') return await docs();

    return true;
};