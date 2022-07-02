import { Keystore } from '../credentials';
interface AndroidCredentials {
    keystore: Keystore;
}
interface iOSCredentials {
    provisioningProfile: string;
    distributionCertificate: {
        certP12: string;
        certPassword: string;
    };
}
export declare function fileExistsAsync(projectDir: string): Promise<boolean>;
export declare function readAndroidCredentialsAsync(projectDir: string): Promise<AndroidCredentials>;
export declare function readIosCredentialsAsync(projectDir: string): Promise<iOSCredentials>;
export declare function readSecretEnvsAsync(projectDir: string): Promise<Record<string, string> | undefined>;
export declare function readRawAsync(projectDir: string): Promise<any>;
export {};
