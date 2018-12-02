import { isNullOrEmpty } from '@delta-framework/core';
import { fileExists, loadStats } from './Abstractions/FileSystem';

export const validate = async (filePath: string): Promise<boolean> => {

    if (isNullOrEmpty(filePath)) {
        console.error('You need to specify a filePath');
        return false;
    }
    if (!filePath.endsWith('.json')) {
        console.error(`Path '${filePath}' is not a .json file`);
        return false;
    }
    if (!await fileExists(filePath)) {
        console.error(`Path '${filePath}' doesn't exist`);
        return false;
    }

    const fileStatus = await loadStats(filePath);
    if (!fileStatus.isFile()) {
        console.error(`Path '${filePath}' is not a file`);
        return false;
    }

    return true;
};