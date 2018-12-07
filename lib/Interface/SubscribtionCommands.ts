import { isNullOrEmpty } from '@delta-framework/core';
import { help } from './HelpCommands';
import { getSubscribtionsRepository } from '../Subscribtions';

/**
 * Add a file to the subscribtions list
 */
const subscribe = async () => {

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