import { daemonRunning } from '../Process';
import { isNullOrEmpty } from '@delta-framework/core';
import { help } from './HelpCommands';
import { getSubscribtionsRepository } from '../Subscribtions';
import { startEmulator } from '../Emulator';

/**
 * Add a file to the subscribtions list
 */
const subscribe = async () => {

    if (!await daemonRunning()) {
        await startEmulator();
        console.info('Started Azure KeyVault Emulator');
    }

    // Try to read arguments
    const subscribtionName = process.argv[3];
    if (isNullOrEmpty(subscribtionName)) return help();
    const filePath = process.argv[4];
    if (isNullOrEmpty(filePath)) return help();

    // Add to list
    const subscribtions = await getSubscribtionsRepository();
    await subscribtions.addSubscribtion(subscribtionName, filePath);
    console.info(`Added subscribtion: '${subscribtionName}' -> '${filePath}'`);

    return process.exit(0);
};

/**
 * Try to apply Subscribtion commands for the given command or continue
 * @param command
 */
export const tryListenerCommands = async (command: string): Promise<true | void> => {

    if (command === 'subscribe') return await subscribe();

    return true;
};