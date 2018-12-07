import * as path from 'path';

import { isNullOrEmpty, isNullOrUndefined, emptyString, isNullOrWhitespace } from '@delta-framework/core';
import { get as getProcessInfo } from 'current-processes';
import { fileExists, writeFile, readFile } from './Abstractions/FileSystem';
import { spawn } from 'child_process';

/** The directory this package is installed */
export const packageDir = path.resolve(__dirname, '../');

/**
 * Type handle for the discovered processes
 */
type NodeProcess = {
    name: string,
    pid: number
};

/**
 * The file to save the process id to
 */
const processInfoFilePath = `${packageDir}/.pid`;

// tslint:disable:no-var-requires
// tslint:disable:no-require-imports
/** The name of this cli */
export const appName = require(`${packageDir}/package.json`).name as string;
/** The name of the background process */
export const daemonName = `${appName}-daemon`;

/** Set the process name to indicate this is the Daemon process */
export const setDaemonName = () => {
    process['name'] = daemonName;
    process.title = daemonName;
};
/** Set the process name to the appName */
export const setProcessName = () => {
    process['name'] = appName;
    process.title = appName;
};

/** Check if the Daemon is currently running */
export const daemonRunning = async () => {

    const processes = await listProcesses();
    const pid = await getProcessId();
    return !isNullOrUndefined(processes.find(p => p.pid === pid));
};

/** List all the running processes on this machine */
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

/** Save the process id to disk to prevent multiple instances of the Daemon */
export const saveProcess = async (pid: number | null) => {

    if (pid == null) return await writeFile(processInfoFilePath, emptyString);

    const processes = await listProcesses();
    const process = processes.find(p => p.pid === pid);
    if (process == null) return await writeFile(processInfoFilePath, emptyString);

    await writeFile(processInfoFilePath, `${pid},${process.name}`);
};

/** Read the Daemon process id */
export const getProcessId = async (): Promise<number | null> => {

    if (!await fileExists(processInfoFilePath)) return null;

    const fileContent = await readFile(processInfoFilePath);
    if (isNullOrWhitespace(fileContent)) return null;
    const processInfo = fileContent.split(',');

    if (isNaN(processInfo[0] as any)) return null;

    const pid = +processInfo[0];
    const processes = await listProcesses();
    const process = processes.find(p => p.pid === pid);

    if (isNullOrUndefined(process)) return null;
    if (process.name !== processInfo[1]) return null;

    return pid;
};

/** Spawn a script in the background, thay have to be placed in the './lib/Commands' directory */
export const spawnProcess = (fileName: string) => {
    spawn('node', [`${packageDir}/lib/Commands/${fileName}.js`], {
        detached: true,
        cwd: process.cwd(),
        shell: true,
        stdio: 'inherit',
        windowsHide: true
    });
    console.log();
};