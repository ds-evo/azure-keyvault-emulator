import { isNullOrUndefined, isNullOrEmpty } from '@delta-framework/core';
import { start, stop, restart, listen } from '../Service';
import { help, docs } from './Help';

(() => {

    const command = process.argv[2];
    if (isNullOrEmpty(command) || command === 'help') return help();
    if (command === 'docs') return docs();

    if (command === 'start') {
        const portArgument = process.argv[3];

        if (isNullOrEmpty(portArgument)) return start();
        if (isNaN(+portArgument)) return help();

        return start(+portArgument);
    }
    if (command === 'stop') return stop();
    if (command === 'restart') return restart();

    if (command === 'listen') {
        const subscribtionNameArgument = process.argv[3];
        const filePathArgument = process.argv[4];

        // validation inside
        return listen(subscribtionNameArgument, filePathArgument);
    }
})();