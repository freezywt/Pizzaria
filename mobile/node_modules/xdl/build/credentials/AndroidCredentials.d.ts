import { SpawnResult } from '@expo/spawn-async';
export declare type Keystore = {
    keystore: string;
    keystorePassword: string;
    keyPassword: string;
    keyAlias: string;
};
export declare type KeystoreInfo = {
    keystorePath: string;
    keystorePassword: string;
    keyPassword: string;
    keyAlias: string;
};
export declare function exportCertBase64({ keystorePath, keystorePassword, keyAlias, }: Pick<KeystoreInfo, 'keystorePath' | 'keystorePassword' | 'keyAlias'>, certFile: string): Promise<SpawnResult>;
export declare function logKeystoreHashes(keystoreInfo: KeystoreInfo, linePrefix?: string): Promise<void>;
export declare function generateUploadKeystore(uploadKeystorePath: string, androidPackage: string, experienceName: string): Promise<KeystoreInfo>;
