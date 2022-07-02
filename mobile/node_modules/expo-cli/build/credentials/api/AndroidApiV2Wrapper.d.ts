import { ApiV2 } from 'xdl';
import { AndroidCredentials, Keystore } from '../credentials';
declare type AllCredentialsApiResponse = AndroidCredentials[];
export default class ApiClient {
    private api;
    constructor(api: ApiV2);
    getAllCredentialsApi(): Promise<AllCredentialsApiResponse>;
    getAllCredentialsForAppApi(experienceName: string): Promise<AndroidCredentials>;
    updateKeystoreApi(experienceName: string, keystore: Keystore): Promise<void>;
    updateFcmKeyApi(experienceName: string, fcmApiKey: string): Promise<void>;
    removeKeystoreApi(experienceName: string): Promise<void>;
    removeFcmKeyApi(experienceName: string): Promise<void>;
}
export {};
