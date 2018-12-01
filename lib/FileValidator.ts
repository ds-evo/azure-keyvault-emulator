import * as fileSystem from 'fs';

import { isNullOrEmpty } from '@delta-framework/core';

export const validate = (filePath: string): boolean => {

    if (isNullOrEmpty(filePath)) {
        console.error('You need to specify a filePath');
        return false;
    }
    if (!filePath.endsWith('.json')) {
        console.error(`Path '${filePath}' is not a .json file`);
        return false;
    }
    if (!fileSystem.existsSync(filePath)) {
        console.error(`Path '${filePath}' doesn't exist`);
        return false;
    }

    const fileStatus = fileSystem.lstatSync(filePath);
    if (!fileStatus.isFile()) {
        console.error(`Path '${filePath}' is not a file`);
        return false;
    }

    return true;
};