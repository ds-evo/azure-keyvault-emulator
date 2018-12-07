import { daemonRunning } from '../Process';
import { startEmulator, stopEmulator } from '../Emulator';

/**
 * Start the emulator
 */
const start =  async(): Promise<void> => {

    if (await daemonRunning()) {
        console.warn('Azure KeyVault Emulator already running');
        return;
    }

    startEmulator();

    console.info('Started Azure KeyVault Emulator');

    return process.exit(0);
};

/**
 * Stop the emulator
 */
const stop =  async(): Promise<void> => {

    if (!await daemonRunning()) {
        console.warn('Azure KeyVault Emulator not running');
        return;
    }

    await stopEmulator();

    console.info('Stopped Azure KeyVault Emulator');

    return process.exit(0);
};

/**
 * Restart the emulator
 */
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

/**
 * Try to apply Start/Stop/Restart commands for the given command or continue
 * @param command
 */
export const tryRunnerCommands = async (command: string): Promise<true | void> => {

    if (command === 'start') return await start();
    if (command === 'stop') return await stop();
    if (command === 'restart') return await restart();

    return true;
};