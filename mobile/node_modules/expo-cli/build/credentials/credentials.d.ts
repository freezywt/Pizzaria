import { AndroidCredentials as Android } from 'xdl';
import * as appleApi from '../appleApi';
import { CredentialSchema } from './actions/promptForCredentials';
export declare type IosCredentials = {
    appCredentials: IosAppCredentials[];
    userCredentials: (IosPushCredentials | IosDistCredentials)[];
};
export declare type IosAppCredentials = {
    experienceName: string;
    bundleIdentifier: string;
    pushCredentialsId?: number;
    distCredentialsId?: number;
    credentials: {
        provisioningProfileId?: string;
        provisioningProfile?: string;
        teamId?: string;
        teamName?: string;
        pushId?: string;
        pushP12?: string;
        pushPassword?: string;
    };
};
export declare type IosPushCredentials = {
    id: number;
    type: 'push-key';
} & appleApi.PushKey;
export declare type IosDistCredentials = {
    id: number;
    type: 'dist-cert';
} & appleApi.DistCert;
export declare const distCertSchema: CredentialSchema<appleApi.DistCert>;
export declare const pushKeySchema: CredentialSchema<appleApi.PushKey>;
export declare const provisioningProfileSchema: CredentialSchema<appleApi.ProvisioningProfile>;
export declare const appleTeamSchema: CredentialSchema<Pick<appleApi.Team, 'id'>>;
export declare type FcmCredentials = {
    fcmApiKey: string;
};
export declare type Keystore = Android.Keystore;
export declare type AndroidCredentials = {
    experienceName: string;
    keystore: Keystore | null;
    pushCredentials: FcmCredentials | null;
};
export declare const keystoreSchema: CredentialSchema<Android.Keystore>;
export declare const EXPO_WILL_GENERATE = "EXPO_PLEASE_GENERATE_THIS_FOR_ME";
