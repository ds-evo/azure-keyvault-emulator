
export type SecretBundle = {
    id: string,
    value: any,
    contentType?: string
    managed?: boolean
};

export type SecretDictionary = {
    [key: string]: SecretBundle
};

export type SubscribtionDictionary = {
    [key: string]: SecretDictionary[]
};

export default SecretBundle;