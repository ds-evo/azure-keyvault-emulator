import { daemonRunning, startDaemon, stopDaemon } from '../Process';

export const start =  async(): Promise<void> => {

    if (await daemonRunning()) {
        console.warn('Azure KeyVault Emulator already running');
        return;
    }

    await startDaemon();

    console.info('Started Azure KeyVault Emulator');

    return process.exit(0);
};

const stop =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await stopDaemon();

    console.info('Stopped Azure KeyVault Emulator');

    return process.exit(0);
};

const restart =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await stopDaemon();
    await new Promise((res) => { setTimeout(() => res(), 200); });
    await startDaemon();

    console.info('Restarted Azure KeyVault Emulator');

    return process.exit(0);
};

export const tryRunnerCommands = async (command: string): Promise<true | void> => {

    if (command === 'start') return await start();
    if (command === 'stop') return await stop();
    if (command === 'restart') return await restart();

    return true;
};