import { ApiV2 } from 'xdl';
import * as appleApi from '../../appleApi';
import { IosAppCredentials, IosDistCredentials, IosPushCredentials } from '../credentials';
export interface AppLookupParams {
    accountName: string;
    projectName: string;
    bundleIdentifier: string;
}
interface IosAllCredentialsForApp extends IosAppCredentials {
    pushCredentials: Omit<IosPushCredentials, 'id' | 'type'>;
    distCredentials: Omit<IosDistCredentials, 'id' | 'type'>;
}
interface AllCredentialsApiResponse {
    appCredentials: IosAppCredentials[];
    userCredentials: (IosDistCredentials | IosPushCredentials)[];
}
export default class ApiClient {
    private api;
    constructor(api: ApiV2);
    getAllCredentialsApi(accountName: string): Promise<AllCredentialsApiResponse>;
    getAllCredentialsForAppApi({ accountName, projectName, bundleIdentifier, }: AppLookupParams): Promise<IosAllCredentialsForApp>;
    getUserCredentialsByIdApi(id: number, accountName: string): Promise<IosDistCredentials | IosPushCredentials>;
    createDistCertApi(accountName: string, credentials: appleApi.DistCert): Promise<number>;
    updateDistCertApi(id: number, accountName: string, credentials: appleApi.DistCert): Promise<void>;
    deleteDistCertApi(id: number, accountName: string): Promise<void>;
    useDistCertApi({ accountName, projectName, bundleIdentifier }: AppLookupParams, userCredentialsId: number): Promise<void>;
    createPushKeyApi(accountName: string, credentials: appleApi.PushKey): Promise<number>;
    updatePushKeyApi(id: number, accountName: string, credentials: appleApi.PushKey): Promise<IosPushCredentials>;
    deletePushKeyApi(id: number, accountName: string): Promise<void>;
    usePushKeyApi({ accountName, projectName, bundleIdentifier }: AppLookupParams, userCredentialsId: number): Promise<void>;
    deletePushCertApi({ accountName, projectName, bundleIdentifier, }: AppLookupParams): Promise<void>;
    updateProvisioningProfileApi({ accountName, projectName, bundleIdentifier }: AppLookupParams, credentials: appleApi.ProvisioningProfile): Promise<void>;
    deleteProvisioningProfileApi({ accountName, projectName, bundleIdentifier, }: AppLookupParams): Promise<void>;
}
export {};
