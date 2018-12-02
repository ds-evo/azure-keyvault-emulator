import { getSubscribtionsRepository } from './Subscribtions';
import { runHost } from './Host';

export const hostService = async (portNumber?: number) => {

    const subscribtions = await getSubscribtionsRepository();
    await runHost(subscribtions, portNumber);
};

export const addListenerMapping = async(subscribtionName: string, filePath: string) => {

    const subscribtions = await getSubscribtionsRepository();
    await subscribtions.addListenerMapping(subscribtionName, filePath);

    console.info(`Set subcribtion: '${subscribtionName}' to: '${filePath}'`);
};

// todo maybe unlisten?