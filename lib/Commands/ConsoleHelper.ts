import { exec } from 'child_process';

/**
 * Execute a non-javascript bash command
 * @param command command to run
 */
export const executeCmd = async(command: string, hideOutput = false):
    Promise<string> => executeInDirectory(process.cwd(), command, hideOutput);

/**
 * Execute a non-javascript bash command
 * @param directory working directory of command
 * @param command command to run
 */
export const executeInDirectory = (directory: string, command: string, hideOutput = false): Promise<string> => {
    return new Promise((done, fail) => exec(command, { cwd: directory }, (err, stdout, stderr) => {

        if (!hideOutput) {
            console.info(command);

            console.info(stdout.trim());
            if (!!stderr && stderr.trim() !== String())
                console.error(stderr);
        }

        if (!!err) fail(err); else done(stdout.trim());
    }));
};