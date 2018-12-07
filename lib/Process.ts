import { isNullOrEmpty, isNullOrUndefined, emptyString, isNullOrWhitespace } from '@delta-framework/core';
import { get as getProcessInfo } from 'current-processes';
import { fileExists, writeFile, readFile } from './Abstractions/FileSystem';
import { spawn } from 'child_process';
import * as fkill from 'fkill';

type NodeProcess = {
    name: string,
    pid: number
};

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
export const appName = require('../package.json').name as string;
export const daemonName = `${appName}-daemon`;

const processInfoFilePath = `${process.cwd()}/.pid`;

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
            else resolve(processes);
        });
    });
};

export const setProcessId = async (pid: number | null) =>
    await writeFile(processInfoFilePath, pid == null ?
        emptyString :
        pid.toString());

export const getProcessId = async (): Promise<number | null> => {

    if (!await fileExists(processInfoFilePath)) return null;

    const fileContent = await readFile(processInfoFilePath);
    if (isNullOrWhitespace(fileContent)) return null;
    if (isNaN(fileContent as any)) return null;

    return +fileContent;
};

export const spawnProcess = (fileName: string) => { spawn('node', [`${process.cwd()}/lib/Commands/${fileName}.js`], {
    detached: true,
    cwd: process.cwd(),
    shell: true,
    stdio: 'pipe',
    windowsHide: true
}); };