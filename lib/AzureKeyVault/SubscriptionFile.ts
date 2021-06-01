import SecretBundle from './SecretBundle';

/**
 * Model used for reading in subcribtion .json files
 */
export type SubscriptionFile = {
    [key: string]: SecretBundle | string
};

export default SubscriptionFile;