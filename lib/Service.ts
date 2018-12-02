import { createSubscribtionsRepository } from './Subscribtions';
import { runHost } from './Host';

const subscribtions = createSubscribtionsRepository();

export const hostService = (portNumber?: number) => {

    runHost(subscribtions, portNumber);
};

export const addListenerMapping = (subscribtionName: string, filePath: string) => {

    subscribtions.addListenerMapping(subscribtionName, filePath);
};

// todo maybe unlisten?