import * as fileSystem from 'fs';
import { isNullOrUndefined } from '@delta-framework/core';

/**
 * Asynchronously reads the entire contents of a file
 * @param filePath A path to a file. If a URL is provided, it must use the file: protocol
 */
export const readFile = (filePath: string) => new Promise<string>((resolve, reject) => {
    fileSystem.readFile(filePath, 'UTF-8', (err, data) => {
        if (isNullOrUndefined(err)) resolve(data);
        else reject(err);
    });
});