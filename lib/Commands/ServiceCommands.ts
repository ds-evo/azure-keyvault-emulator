import { daemonRunning, setDaemonName } from '../Process';
import { isNullOrEmpty } from '@delta-framework/core';
import { hostService, addListenerMapping } from '../Service';
import { help } from './HelpCommands';
import { start } from './RunnerCommands';

const host = async () => {
    if (await daemonRunning()) {
        console.warn('Azure KeyVault already running');
        return;
    }
    setDaemonName();
    const portArgument = process.argv[3];

    if (isNullOrEmpty(portArgument)) return await hostService();
    if (isNaN(+portArgument)) return help();

    return await hostService(+portArgument);
};

const listen = async () => {
    const subscribtionNameArgument = process.argv[3];
    if (isNullOrEmpty(subscribtionNameArgument)) return help();
    const filePathArgument = process.argv[4];
    if (isNullOrEmpty(filePathArgument)) return help();

    await addListenerMapping(subscribtionNameArgument, filePathArgument);

    // This has to be last because of process.exit
    if (!await daemonRunning()) return await start();
};

export const tryServiceCommands = async (command: string): Promise<true | void> => {

    if (command === 'host') return await host();
    if (command === 'listen') return await listen();

    return true;
};