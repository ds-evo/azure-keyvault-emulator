import { createSecretsRepository } from './Secrets';
import { runHost } from './Host';
// todo host via https://github.com/unitech/pm2

const subscribtions = createSecretsRepository();

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

// todo add command like "service add subscribtionName filePath"
export const listen = (subscribtionName: string, filePath: string) => {
    subscribtions.addListenerMapping(subscribtionName, filePath);
};

// todo maybe removeMapping?