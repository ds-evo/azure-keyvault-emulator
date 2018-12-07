import SecretBundle from './AzureKeyVault/SecretBundle';
import SubscribtionFile from './AzureKeyVault/SubscribtionFile';

import { isNullOrUndefined, isString, isNullOrEmpty, isObject } from '@delta-framework/core';
import { validate } from './FileValidator';
import { readFile } from './Abstractions/FileSystem';

/** A record of a KeyVault secret entry */
export type SecretRecord = { key: string, secret: SecretBundle };
/** A list of secret entries read from a file */
export type Subscribtion = SecretRecord[];

/**
 * Read the secrets from file to memory
 * @param filePath The path to a .json file containing secrets
 */
export const readSecrets = async (filePath: string): Promise<Subscribtion> => {

    if (!await validate(filePath)) return [];

    try {
        const jsonFileContent = (await readFile(filePath)).trim();
        console.log(jsonFileContent);
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

/**
 * Convert subscribtion file to records
 * @param subscribtion Contents of a .json subscribtion file
 */
const parseSubscribtion = (subscribtion: SubscribtionFile): Subscribtion =>
    Object.keys(subscribtion)
        .map(secretKey => mapSecretBundleToRecord(secretKey, subscribtion))
        .filter(recordNotNull);

/**
 * Make sure the records isn't null
 * @param secretRecord
 */
const recordNotNull = (secretRecord: SecretRecord | null):
    secretRecord is SecretRecord => !isNullOrUndefined(secretRecord);

/**
 * Get a Record from the file based on a key if it exists
 * @param secretKey Key of the secret requested
 * @param subscribtion Contents of subsribtion file
 */
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

/**
 * Convert a string to a model Azure KeyVault uses
 * @param secretKey Key of the record
 * @param secretValue String value of the record
 */
const buildSecretRecordFromString = (secretKey: string, secretValue: string): SecretRecord => ({
    key: secretKey,
    secret: {
        id: secretKey,
        value: secretValue,
        managed: false
    }
});

/**
 * Add missing fields to object model
 * @param secretKey Key of the record
 * @param secretBundle SecretBundle object model
 */
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