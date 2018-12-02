import * as fkill from 'fkill';

import { executeCmd } from './ConsoleHelper';
import { daemonRunning, daemonName } from '../Process';

export const start =  async(forwardArgs= false): Promise<void> => {

    if (await daemonRunning()) {
        console.warn('Azure KeyVault Emulator already running');
        return;
    }

    invokeStart();

    console.info('Started Azure KeyVault Emulator');

    // Exit out of exec call
    process.exit(0);
};

const stop =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await invokeStop();

    console.info('Stopped Azure KeyVault Emulator');

    // Exit out of exec call
    process.exit(0);
};

const restart =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await invokeStop();
    invokeStart();

    console.info('Restarted Azure KeyVault Emulator');

    // Exit out of exec call
    process.exit(0);
};

const invokeStart = () => executeCmd(`node ${process.argv[1]} host`).catch(console.error);
const invokeStop = async () => await fkill(daemonName);

export const tryRunnerCommands = async (command: string): Promise<true | void> => {

    if (command === 'start') return await start();
    if (command === 'stop') return await stop();
    if (command === 'restart') return await restart();

    return true;
};