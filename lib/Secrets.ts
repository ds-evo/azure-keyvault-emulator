import * as fileSystem from 'fs';

import { SecretBundle, SecretDictionary, SubscribtionDictionary } from './AzureKeyVault/SecretBundle';
import { isNullOrEmpty, isNullOrUndefined} from '@delta-framework/core';

export type SubscribtionsRepository = {
    addListenerMapping: (name: string, filePath: string) => void,
    getSecrets: (subscribtionName: string) => SecretDictionary[]
};

export const createSecretsRepository = (): SubscribtionsRepository => {
    
    const subscribtions: SubscribtionDictionary = { };

    return {
        addListenerMapping: (subscribtionName, filePath) => addMapping(subscribtionName, filePath, subscribtions),
        getSecrets: (subscribtionName) => getSecrets(subscribtionName, subscribtions)
    };
};

const addMapping = (subscribtionName: string, filePath: string, subscribtions: SubscribtionDictionary): void => {
    if(isNullOrEmpty(subscribtionName)) {
        console.error('todo');
        return;
    }
    if(isNullOrEmpty(filePath) || !fileSystem.existsSync(filePath)) {
        console.error('todo');
        return;
    }

    const folderStat = fileSystem.lstatSync(filePath);
    if (!folderStat.isFile() || !filePath.endsWith('.json')) {
        console.error('todo');
        return;
    }

    const secrets = readSecrets(filePath);
    subscribtions[subscribtionName] = secrets;
};

// todo convert to jsonreader instead of require
const readSecrets = (filePath: string): SecretDictionary[] => {

    try{
        const secret = require(filePath);
        if(isNullOrUndefined(secret)) return [];

        const secretsExpanded = <SecretDictionary[]>Object.keys(secret)
            .map(key => {
                
                const secretBundle: SecretBundle = secret[key];
                if (isNullOrEmpty(secretBundle.id)) {
                    console.warn('todo');
                    return null;
                }
                if (isNullOrUndefined(secretBundle.value)) {
                    console.warn('todo');
                    return null;
                }

                return { 
                    [key]: {
                        id: secretBundle.id,
                        value: secretBundle.value,
                        contentType: secretBundle.contentType,
                        managed: secretBundle.managed || false
                    } 
                };
            })
            .filter(secretBundle => secretBundle != null);

        return secretsExpanded;
    }
    catch (ex){
        console.error(ex);
        return [];
    }
}

const getSecrets = (subscribtionName: string, storedSecrets: SubscribtionDictionary): 
    SecretDictionary[] => storedSecrets[subscribtionName];