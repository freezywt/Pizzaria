import { PlistObject } from '@expo/plist';
export declare type IPABuilderParams = {
    provisioningProfilePath: string;
    certPath: string;
    certPassword?: string;
    appUUID: string;
    keychainPath: string;
    bundleIdentifier: string;
    teamID: string;
    manifest: any;
    workspacePath: string;
    clientBuild?: boolean;
};
export declare function validateProvisioningProfile(plistData: PlistObject, { distCertFingerprint, bundleIdentifier, }: {
    distCertFingerprint: string;
    bundleIdentifier: string;
}): void;
