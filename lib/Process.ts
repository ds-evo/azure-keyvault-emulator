import { isNullOrEmpty, isNullOrUndefined } from '@delta-framework/core';
import { get as getProcessInfo } from 'current-processes';

// todo get a replacement for 'current-processes' that supports longer names
// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
const jsonAppName = require('../package.json').name;

export const appName = 'cmd-AkvE';
export const daemonName = 'daemon-AkvE';

export const setDaemonName = () => {
    process.title = daemonName;
};
export const setProcessName = () => {
    process.title = appName;
};

export const daemonRunning = async () => {
    const processes = await listProcesses();
    return processes.includes(daemonName);
};

const listProcesses = (): Promise<string[]> => {
    return new Promise((resolve, reject) =>
    {
        getProcessInfo(function(err: any , processes: { name: string }[]): void {
            if (!isNullOrEmpty(err)) {
                reject(err);
                return;
            }

            if (isNullOrUndefined(processes)) resolve([]);
            else resolve(processes.map(p => p.name));
        });
    });
};