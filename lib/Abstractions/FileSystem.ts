import * as fileSystem from 'fs';
import { isNullOrUndefined } from '@delta-framework/core';

export const fileExists = (filePath: string) => new Promise<boolean>((resolve, _) => {
    fileSystem.exists(filePath, exists => resolve(exists));
});
export const writeFile = (filePath: string, content: string) => new Promise<void>((resolve, reject) => {
    fileSystem.writeFile(filePath, content, err => {
        if (isNullOrUndefined(err)) resolve();
        else reject(err);
    });
});
export const readFile = (filePath: string) => new Promise<string>((resolve, reject) => {
    fileSystem.readFile(filePath, 'UTF-8', (err, data) => {
        if (isNullOrUndefined(err)) resolve(data);
        else reject(err);
    });
});