import Schemer from '@expo/schemer';
export declare type Schema = any;
export declare type AssetSchema = {
    fieldPath: string;
};
export declare function validatorFromProjectRoot(projectRoot: string): Promise<Schemer>;
export declare function validateAsync(projectRoot: string): Promise<void>;
export declare function getSchemaAsync(sdkVersion: string): Promise<Schema>;
/**
 * Array of schema nodes that refer to assets along with their field path (eg. 'notification.icon')
 *
 * @param sdkVersion
 */
export declare function getAssetSchemasAsync(sdkVersion: string | undefined): Promise<string[]>;
