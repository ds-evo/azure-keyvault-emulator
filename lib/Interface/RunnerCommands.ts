import { daemonRunning } from '../Process';
import { startEmulator, stopEmulator } from '../Emulator';

export const start =  async(): Promise<void> => {

    if (await daemonRunning()) {
        console.warn('Azure KeyVault Emulator already running');
        return;
    }

    startEmulator();

    console.info('Started Azure KeyVault Emulator');

    return process.exit(0);
};

const stop =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await stopEmulator();

    console.info('Stopped Azure KeyVault Emulator');

    return process.exit(0);
};

const restart =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await stopEmulator();
    startEmulator();

    console.info('Restarted Azure KeyVault Emulator');

    return process.exit(0);
};

export const tryRunnerCommands = async (command: string): Promise<true | void> => {

    if (command === 'start') return await start();
    if (command === 'stop') return await stop();
    if (command === 'restart') return await restart();

    return true;
};