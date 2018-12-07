import * as fileSystem from 'fs';
import { isNullOrUndefined } from '@delta-framework/core';

/**
 * Asynchronously tests whether or not the given path exists by checking with the file system
 * @param filePath A path to a file. If a URL is provided, it must use the file: protocol
 */
export const fileExists = (filePath: string) => new Promise<boolean>((resolve, _) => {
    fileSystem.exists(filePath, exists => resolve(exists));
});

/**
 * Get file status. Does not dereference symbolic links
 * @param filePath A path to a file. If a URL is provided, it must use the file: protocol
 */
export const loadStats = (filePath: string) => new Promise<fileSystem.Stats>((resolve, reject) => {
    fileSystem.lstat(filePath, (err, stats) => {
        if (isNullOrUndefined(err)) resolve(stats);
        else reject(err);
    });
});

/**
 * Asynchronously writes data to a file, replacing the file if it already exists
 * @param filePath A path to a file. If a URL is provided, it must use the file: protocol
 * @param content The data to write. If something other than a Buffer or Uint8Array is provided, the value is coerced to a string
 */
export const writeFile = (filePath: string, content: string) => new Promise<void>((resolve, reject) => {
    fileSystem.writeFile(filePath, content, err => {
        if (isNullOrUndefined(err)) resolve();
        else reject(err);
    });
});

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