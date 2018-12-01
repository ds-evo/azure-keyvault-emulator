import SecretBundle from './SecretBundle';

/**
 * Model used for reading in subcribtion .json files
 */
export type SubscribtionFile = {
    [key: string]: SecretBundle | string
};

export default SubscribtionFile;