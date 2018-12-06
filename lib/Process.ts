import { isNullOrEmpty, isNullOrUndefined, emptyString, isNullOrWhitespace } from '@delta-framework/core';
import { get as getProcessInfo } from 'current-processes';
import { fileExists, writeFile, readFile } from './Abstractions/FileSystem';
import { spawn } from 'child_process';
import * as fkill from 'fkill';

type NodeProcess = {
    name: string,
    pid: number
};

// todo get a replacement for 'current-processes' that supports longer names
// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
const jsonAppName = require('../package.json').name;

export const appName = 'cmd-AkvE';
export const daemonName = 'daemon-AkvE';

const processInfoFilePath = `${process.cwd()}/processInfo.pid`;

export const setDaemonName = () => {
    process['name'] = daemonName;
    process.title = daemonName;
};
export const setProcessName = () => {
    process['name'] = appName;
    process.title = appName;
};

export const daemonRunning = async () => {

    const processes = await listProcesses();
    const pid = await getProcessId();
    return !isNullOrUndefined(processes.find(p => p.pid === pid));
};

const listProcesses = (): Promise<NodeProcess[]> => {
    return new Promise((resolve, reject) =>
    {
        getProcessInfo(function(err: any , processes: NodeProcess[]): void {
            if (!isNullOrEmpty(err)) {
                reject(err);
                return;
            }

            if (isNullOrUndefined(processes)) resolve([]);
            else resolve(processes
                .filter(p => p.name.includes('node') || p.name.includes(appName) || p.name.includes(daemonName)));
        });
    });
};

export const setProcessId = async (pid: number) => {
    await writeFile(processInfoFilePath, pid == null ?
        emptyString :
        pid.toString());
};

const getProcessId = async (): Promise<number | null> => {

    if (!await fileExists(processInfoFilePath)) return null;

    const fileContent = await readFile(processInfoFilePath);
    if (isNullOrWhitespace(fileContent)) return null;
    if (isNaN(fileContent as any)) return null;

    return +fileContent;
};

export const startDaemon = () => {

    spawn('node', [`${process.cwd()}/lib/Host.js`], {
        detached: true,
        cwd: process.cwd(),
        shell: true,
        stdio: 'inherit',
        windowsHide: true
    });
};

export const stopDaemon = async () => {

    const pid = getProcessId();
    if (pid == null) return;
    await fkill(pid);
};