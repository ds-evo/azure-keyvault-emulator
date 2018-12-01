
/**
 * Model for azure SecretBundles
 */
export type SecretBundle = {
    id?: string,
    value: string,
    contentType?: string
    managed?: boolean
};

export default SecretBundle;