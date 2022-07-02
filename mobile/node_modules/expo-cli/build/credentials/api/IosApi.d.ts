import { ApiV2 } from 'xdl';
import * as appleApi from '../../appleApi';
import { IosAppCredentials, IosCredentials, IosDistCredentials, IosPushCredentials } from '../credentials';
import ApiClient from './IosApiV2Wrapper';
export interface AppLookupParams {
    accountName: string;
    projectName: string;
    bundleIdentifier: string;
}
export declare function getAppLookupParams(experienceName: string, bundleIdentifier: string): {
    accountName: string;
    projectName: string;
    bundleIdentifier: string;
};
interface CredentialsCache {
    [accountName: string]: {
        appCredentials: {
            [experienceNameBundleIdentifier: string]: IosAppCredentials;
        };
        userCredentials: {
            [id: string]: IosDistCredentials | IosPushCredentials;
        };
    };
}
export default class IosApi {
    client: ApiClient;
    credentials: CredentialsCache;
    isPrefetched: {
        [accountName: string]: boolean;
    };
    constructor(api: ApiV2);
    getAllCredentials(accountName: string): Promise<IosCredentials>;
    getDistCert(appLookupParams: AppLookupParams): Promise<IosDistCredentials | null>;
    createDistCert(accountName: string, credentials: appleApi.DistCert): Promise<IosDistCredentials>;
    updateDistCert(id: number, accountName: string, credentials: appleApi.DistCert): Promise<IosDistCredentials>;
    deleteDistCert(id: number, accountName: string): Promise<void>;
    useDistCert(appLookupParams: AppLookupParams, userCredentialsId: number): Promise<void>;
    createPushKey(accountName: string, credentials: appleApi.PushKey): Promise<IosPushCredentials>;
    updatePushKey(id: number, accountName: string, credentials: appleApi.PushKey): Promise<IosPushCredentials>;
    deletePushKey(id: number, accountName: string): Promise<void>;
    getPushKey(appLookupParams: AppLookupParams): Promise<IosPushCredentials | null>;
    usePushKey(appLookupParams: AppLookupParams, userCredentialsId: number): Promise<void>;
    getPushCert(appLookupParams: AppLookupParams): Promise<{
        pushId: string;
        pushP12: string;
        pushPassword: string;
    } | null>;
    deletePushCert(appLookupParams: AppLookupParams): Promise<void>;
    getAppCredentials(appLookupParams: AppLookupParams): Promise<IosAppCredentials>;
    getProvisioningProfile(appLookupParams: AppLookupParams): Promise<appleApi.ProvisioningProfile | null>;
    updateProvisioningProfile(appLookupParams: AppLookupParams, provisioningProfile: appleApi.ProvisioningProfile): Promise<appleApi.ProvisioningProfile>;
    deleteProvisioningProfile(appLookupParams: AppLookupParams): Promise<void>;
    private getAppCredentialsCacheIndex;
    private removeUserCredentialFromCache;
    private ensureAppCredentials;
    private refetchUserCredentials;
    private refetchAppCredentials;
}
export {};
