import { isNullOrEmpty } from '@delta-framework/core';

export const help = (): void => {
    // todo console help
    console.info('helptext');
};

const docs = (): void => {
    // todo open repo url

};

export const tryHelpCommands = (command: string): true | void => {

    if (isNullOrEmpty(command)) return help();
    if (command === 'help') return help();
    if (command === 'docs') return docs();

    return true;
};