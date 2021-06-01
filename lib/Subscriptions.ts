import SecretBundle from './AzureKeyVault/SecretBundle';
import { isNullOrEmpty, isNullOrUndefined, isNullOrWhitespace } from '@delta-framework/core';

import { readSecrets } from './SecretFileReader';

/** Path of the file where subsribtions are stored */
const mapperFilePath = 'secrets.json';

export const getSecret = async (secretKey: string): Promise<SecretBundle | null> => {
    const secrets = await readSecrets(mapperFilePath);
    const secretRecord = secrets.find(secret => secret.key === secretKey);
    if (isNullOrUndefined(secretRecord)) {
        console.warn(`Couldn't find secret '${secretKey}'`);
        return null;
    }
    return secretRecord.secret;
};