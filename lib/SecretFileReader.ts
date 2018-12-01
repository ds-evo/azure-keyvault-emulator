import SecretBundle from './AzureKeyVault/SecretBundle';
import SubscribtionFile from './AzureKeyVault/SubscribtionFile';

import { isNullOrUndefined, isString } from '@delta-framework/core';
import { validate } from './FileValidator';

export type SecretRecord = { key: string, secret: SecretBundle };
export type Subscribtion = SecretRecord[];

export const readSecrets = (filePath: string): Subscribtion => {

    if (!validate(filePath)) return [];

    try {
        // todo convert to jsonreader instead of require
        const subscribtion = require(filePath);
        if (isNullOrUndefined(subscribtion)) return [];

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

        const secretBundle = subscribtion[secretKey];
        if (isNullOrUndefined(secretBundle)) return null;

        if (isString(secretBundle))
            return buildSecretRecordFromString(secretKey, secretBundle);

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