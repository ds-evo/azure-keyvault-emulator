import SecretBundle from './AzureKeyVault/SecretBundle';
import SubscribtionFile from './AzureKeyVault/SubscribtionFile';

import * as fileSystem from 'fs';

import { isNullOrUndefined, isString, isNullOrEmpty, isObject } from '@delta-framework/core';
import { validate } from './FileValidator';

export type SecretRecord = { key: string, secret: SecretBundle };
export type Subscribtion = SecretRecord[];

export const readSecrets = (filePath: string): Subscribtion => {

    if (!validate(filePath)) return [];

    try {
        const jsonFileContent = fileSystem.readFileSync(filePath, 'utf8');
        if (isNullOrEmpty(jsonFileContent)) {
            console.warn(`The file '${filePath}' is empty`);
            return [];
        }
        const subscribtion = JSON.parse(jsonFileContent) as SubscribtionFile;
        if (isNullOrUndefined(subscribtion) || subscribtion === {}) {
            console.warn(`The file '${filePath}' has no secrets`);
            return [];
        }

        const secrets = parseSubscribtion(subscribtion);

        return secrets;
    } catch (ex) {
        console.error(ex);
        return [];
    }
};

const parseSubscribtion = (subscribtion: SubscribtionFile): Subscribtion =>
    Object.keys(subscribtion)
        .map(secretKey => mapSecretBundleToRecord(secretKey, subscribtion))
        .filter(recordNotNull);

const recordNotNull = (secretRecord: SecretRecord | null):
    secretRecord is SecretRecord => !isNullOrUndefined(secretRecord);

const buildSecretRecordFromString = (secretKey: string, secretValue: string): SecretRecord => ({
    key: secretKey,
    secret: {
        id: secretKey,
        value: secretValue,
        managed: false
    }
});

const mapSecretBundleToRecord = (secretKey: string, subscribtion: SubscribtionFile):
    SecretRecord | null => {

        if (!subscribtion.hasOwnProperty(secretKey)) return null;
        const secretBundle = subscribtion[secretKey];
        if (isNullOrUndefined(secretBundle))  {
            console.warn(`Secret '${secretKey}' has no value`);
            return null;
        }

        if (isString(secretBundle))
            return buildSecretRecordFromString(secretKey, secretBundle);

        if (!isObject(secretBundle)) {
            console.warn(`Secret '${secretKey}' is neither a string or a SecretBundle`);
            return null;
        }

       return buildSecretRecordFromBundle(secretKey, secretBundle);
};

const buildSecretRecordFromBundle = (secretKey: string, secretBundle: SecretBundle):
    SecretRecord | null => {

    if (isNullOrUndefined(secretBundle.value)) {
        console.warn(`Secret '${secretKey}' has no value`);
        return null;
    }

    return {
        key: secretKey,
        secret: {
            id: secretBundle.id || secretKey,
            value: secretBundle.value,
            contentType: secretBundle.contentType,
            managed: secretBundle.managed || false
        }
    };
};