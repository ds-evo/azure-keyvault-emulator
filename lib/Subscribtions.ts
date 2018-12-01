import * as fileSystem from 'fs';

import SecretBundle from './AzureKeyVault/SecretBundle';
import { isNullOrEmpty, isNullOrUndefined } from '@delta-framework/core';

import { readSecrets } from './SecretFileReader';
import { validate } from './FileValidator';

/**
 * Closure containing resigtered subsribtions
 */
export type SubscribtionsRepository = {
    /**
     * Add a mapping to listen to a subscribtion .json file
     */
    addListenerMapping: (name: string, filePath: string) => void,
    /**
     * Retreive a secret parsed from a subscribtion
     */
    getSecret: (subscribtionName: string, secretKey: string) => SecretBundle | null
};

type SubscribtionDictionary = {
    [key: string]: string
};

/**
 * Create a @see SubscribtionsRepository
 */
export const createSubscribtionsRepository = (): SubscribtionsRepository => {

    const subscribtions: SubscribtionDictionary = { };

    return {
        addListenerMapping: (subscribtionName, filePath) => addMapping(subscribtionName, filePath, subscribtions),
        getSecret: (subscribtionName, secretKey) => getSecret(subscribtionName, secretKey, subscribtions)
    };
};

const addMapping = (subscribtionName: string, filePath: string, subscribtions: SubscribtionDictionary): void => {
    if (isNullOrEmpty(subscribtionName) || subscribtionName.indexOf(' ') !== -1) {
        console.error('You need to specify a subscribtionName without spaces');
        return;
    }

    if (!validate(filePath)) return;

    subscribtions[subscribtionName] = filePath;
};

const getSecret = (subscribtionName: string, secretKey: string, subscribtions: SubscribtionDictionary):
    SecretBundle | null => {

    if (isNullOrEmpty(subscribtionName) || subscribtionName.indexOf(' ') !== -1) {
        console.error('You need to specify a subscribtionName without spaces');
        return null;
    }
    if (isNullOrEmpty(secretKey) || secretKey.indexOf(' ') !== -1) {
        console.error('You need to specify a secretKey without spaces');
        return null;
    }

    const subscribtion = subscribtions[subscribtionName];
    const secrets = readSecrets(subscribtion);
    if (isNullOrEmpty(subscribtionName)) {
        console.warn(`Couldn't find subscribtion with name '${subscribtionName}'`);
        return null;
    }

    const secretRecord = secrets.find(secret => secret.key === secretKey);
    if (isNullOrUndefined(secretRecord)) {
        console.warn(`Couldn't find secret '${secretKey}' in subcsribtion '${subscribtionName}'`);
        return null;
    }
    return secretRecord.secret;
};