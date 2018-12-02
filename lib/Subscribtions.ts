import SecretBundle from './AzureKeyVault/SecretBundle';
import { isNullOrEmpty, isNullOrUndefined, isNullOrWhitespace } from '@delta-framework/core';

import { readSecrets } from './SecretFileReader';
import { validate } from './FileValidator';
import { fileExists, writeFile, readFile } from './Abstractions/FileSystem';

const mapperFilePath = `${process.cwd()}/subscribtions.json`;

/**
 * Closure containing resigtered subsribtions
 */
export type SubscribtionsRepository = {
    /**
     * Add a mapping to listen to a subscribtion .json file
     */
    addListenerMapping: (name: string, filePath: string) => Promise<void>,
    /**
     * Retreive a secret parsed from a subscribtion
     */
    getSecret: (subscribtionName: string, secretKey: string) => Promise<SecretBundle | null>
};

type SubscribtionDictionary = {
    [key: string]: string
};

/**
 * Create a @see SubscribtionsRepository
 */
export const getSubscribtionsRepository = async (): Promise<SubscribtionsRepository> => {

    await ensureSubscribtionsFile();

    return {
        addListenerMapping,
        getSecret
    };
};

const ensureSubscribtionsFile = async () => {
    if (await fileExists(mapperFilePath)) return;
    await writeSubscribtionsFile({});
};
const writeSubscribtionsFile = async (value: SubscribtionDictionary) => {
    await writeFile(mapperFilePath, JSON.stringify(value));
};
const readSubscribtionsFile = async (): Promise<SubscribtionDictionary> => {
    const fileContent = await readFile(mapperFilePath);
    if (isNullOrWhitespace(fileContent)) return {};

    return JSON.parse(fileContent) as SubscribtionDictionary;
};

const addListenerMapping = async (subscribtionName: string, filePath: string): Promise<void> => {
    if (isNullOrEmpty(subscribtionName) || subscribtionName.indexOf(' ') !== -1) {
        console.error('You need to specify a subscribtionName without spaces');
        return;
    }

    if (!validate(filePath)) return;

    const subscribtions: SubscribtionDictionary = await readSubscribtionsFile();
    subscribtions[subscribtionName] = filePath;
    await writeSubscribtionsFile(subscribtions);
};

const getSecret = async (subscribtionName: string, secretKey: string): Promise<SecretBundle | null> => {

    if (isNullOrEmpty(subscribtionName) || subscribtionName.indexOf(' ') !== -1) {
        console.error('You need to specify a subscribtionName without spaces');
        return null;
    }
    if (isNullOrEmpty(secretKey) || secretKey.indexOf(' ') !== -1) {
        console.error('You need to specify a secretKey without spaces');
        return null;
    }

    const subscribtions: SubscribtionDictionary = await readSubscribtionsFile();
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