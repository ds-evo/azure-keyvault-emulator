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
};

/** Start the emulator via a background process */
export const stopEmulator = async () => {

    await stop();
    await waitForStop();
};
/** Stop the emulator and wait untill stopped */
export const stop = async () => {

    const pid = await getProcessId();
    if (pid == null) return;

    await fkill(pid);

    // Clear the id so startup doesn't need to check running processes
    await saveProcess(null);
};

/**
 * Wait untill the process is terminated
 * @param timeout Timeout handle to cancel if stopping was succesfull
 */
const waitForStop = () => new Promise((resolve) =>  setInterval(() =>
    daemonRunning().then(running => {

    if (running) return;
    resolve();

}), 100));