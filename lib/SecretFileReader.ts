import SecretBundle from './AzureKeyVault/SecretBundle';
import SubscriptionFile from './AzureKeyVault/SubscriptionFile';

import { isNullOrUndefined, isString, isNullOrEmpty, isObject } from '@delta-framework/core';
import { validate } from './FileValidator';
import { readFile } from './Abstractions/FileSystem';

/** A record of a KeyVault secret entry */
export type SecretRecord = { key: string, secret: SecretBundle };
/** A list of secret entries read from a file */
export type Subscription = SecretRecord[];

/**
 * Read the secrets from file to memory
 * @param filePath The path to a .json file containing secrets
 */
export const readSecrets = async (filePath: string): Promise<Subscription> => {

    if (!await validate(filePath)) return [];

    try {
        const jsonFileContent = (await readFile(filePath)).trim();
        if (isNullOrEmpty(jsonFileContent)) {
            console.warn(`The file '${filePath}' is empty`);
            return [];
        }
        const subscription = JSON.parse(jsonFileContent) as SubscriptionFile;
        if (isNullOrUndefined(subscription) || subscription === {}) {
            console.warn(`The file '${filePath}' has no secrets`);
            return [];
        }

        const secrets = parseSubscription(subscription);

        return secrets;
    } catch (ex) {
        console.error(ex);
        return [];
    }
};

/**
 * Convert subscription file to records
 * @param subscription Contents of a .json subscription file
 */
const parseSubscription = (subscription: SubscriptionFile): Subscription =>
    Object.keys(subscription)
        .map(secretKey => mapSecretBundleToRecord(secretKey, subscription))
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
 * @param subscription Contents of subsribtion file
 */
const mapSecretBundleToRecord = (secretKey: string, subscription: SubscriptionFile):
    SecretRecord | null => {

        if (!subscription.hasOwnProperty(secretKey)) return null;
        const secretBundle = subscription[secretKey];
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