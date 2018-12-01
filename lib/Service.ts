import { createSubscribtionsRepository } from './Secrets';
import { runHost } from './Host';
// todo host via https://github.com/unitech/pm2

const subscribtions = createSubscribtionsRepository();

// todo add command like "service start"
// todo add command like "service start portNumber"
export const start = (portNumber?: number) => {

    // todo check if already running
    // and exit
    // otherwise start

    runHost(subscribtions, portNumber);
};
// todo add command like "service stop"
export const stop = () => {

    // todo check if already running
    // and stop

};

export const restart = () => {

    stop();
    start();
};

// todo add command like "service add subscribtionName filePath"
export const listen = (subscribtionName: string, filePath: string) => {

    // Start just to be sure
    start();

    subscribtions.addListenerMapping(subscribtionName, filePath);
};

// todo maybe unlisten?

// todo remove temp test method
// tslint:disable-next-line:no-unused-expression
(() => {
    listen('someName', './test.json');
    subscribtions.getSecret('someName', 'someSecret');
});