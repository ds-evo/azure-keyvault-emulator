import { isNullOrEmpty } from '@delta-framework/core';
import { fileExists, loadStats } from './Abstractions/FileSystem';

/**
 * Validate whether or not the give path refers to an existing json file
 * @param filePath A path to a file. If a URL is provided, it must use the file: protocol
 */
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