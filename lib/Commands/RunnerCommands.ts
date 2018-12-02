import * as fkill from 'fkill';

import { executeCmd } from './ConsoleHelper';
import { emptyString } from '@delta-framework/core';
import { daemonRunning, daemonName } from '../Process';

export const start =  async(): Promise<void> => {

    if (await daemonRunning()) {
        console.info('Azure KeyVault already running');
        return;
    }

    invokeStart();

    console.log('Started Azure KeyVault');
    return process.exit(0);
};

const stop =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.info('Azure KeyVault not running');
        return;
    }

    await invokeStop();

    console.log('Stopped Azure KeyVault');
    return process.exit(0);
};

const restart =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.info('Azure KeyVault not running');
        return;
    }

    await invokeStop();
    invokeStart();

    console.log('Restarted Azure KeyVault');
    return process.exit(0);
};

const invokeStart = () => executeCmd(
    `node ${process.argv[1]} host ${process.argv[3] || emptyString}`);
const invokeStop = async () => await fkill(daemonName);

export const tryRunnerCommands = async (command: string): Promise<true | void> => {

    if (command === 'start') return await start();
    if (command === 'stop') return await stop();
    if (command === 'restart') return await restart();

    return true;
};