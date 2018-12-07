import * as fkill from 'fkill';

import { spawnProcess, setDaemonName, setProcessId, getProcessId, daemonRunning } from './Process';
import { hostHttpServer } from './Server';

export const startEmulator = () => { spawnProcess('Start'); };
export const start = async () => {

    setDaemonName();
    await setProcessId(process.pid);
    await hostHttpServer();
};

export const stopEmulator = async () => {

    spawnProcess('Stop');

    const killTimeout = setTimeout(async () => { await stop(true); }, 5000);
    await waitForStop(killTimeout);
};
export const stop = async (force: boolean) => {

    const pid = await getProcessId();
    if (pid == null) return;

    console.info(`${ force ? 'Killing' : 'Stopping' } process with pid: ${pid}.`);
    await fkill(pid, { force });

    await setProcessId(null);
};

const waitForStop = (timeout: NodeJS.Timeout) => new Promise((resolve) =>  setInterval(() =>
    daemonRunning().then(running => {

    if (running) return;

    clearTimeout(timeout);
    timeout.unref();

    resolve();

}), 100));