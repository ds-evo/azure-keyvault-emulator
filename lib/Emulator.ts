import * as fkill from 'fkill';

import { spawnProcess, setDaemonName, saveProcess, getProcessId, daemonRunning } from './Process';
import { hostHttpServer } from './Server';

/** Start the emulator in a background process */
export const startEmulator = () => { spawnProcess('Start'); };
/** Start the emulator */
export const start = async () => {

    setDaemonName();
    await saveProcess(process.pid);
    await hostHttpServer();

    // Clear the id so startup doesn't need to check running processes
    await saveProcess(null);
};

/** Start the emulator via a background process */
export const stopEmulator = async () => {

    spawnProcess('Stop');

    const killTimeout = setTimeout(async () => { await stop(true); }, 5000);
    await waitForStop(killTimeout);
};
/** Stop the emulator and wait untill stopped */
export const stop = async (force: boolean) => {

    const pid = await getProcessId();
    if (pid == null) return;

    console.info(`${ force ? 'Killing' : 'Stopping' } process with pid: ${pid}.`);
    await fkill(pid, { force });

    // Clear the id so startup doesn't need to check running processes
    await saveProcess(null);
};

/**
 * Wait untill the process is terminated
 * @param timeout Timeout handle to cancel if stopping was succesfull
 */
const waitForStop = (timeout: NodeJS.Timeout) => new Promise((resolve) =>  setInterval(() =>
    daemonRunning().then(running => {

    if (running) return;

    clearTimeout(timeout);
    timeout.unref();

    resolve();

}), 100));