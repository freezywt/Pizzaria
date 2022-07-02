import { ApiV2 } from 'xdl';
import { AndroidCredentials, FcmCredentials, Keystore } from '../credentials';
export default class AndroidApi {
    private client;
    private shouldRefetchAll;
    private credentials;
    constructor(api: ApiV2);
    fetchAll(): Promise<{
        [key: string]: AndroidCredentials;
    }>;
    fetchKeystore(experienceName: string): Promise<Keystore | null>;
    fetchCredentials(experienceName: string): Promise<AndroidCredentials>;
    updateKeystore(experienceName: string, keystore: Keystore): Promise<void>;
    fetchFcmKey(experienceName: string): Promise<FcmCredentials | null>;
    updateFcmKey(experienceName: string, fcmApiKey: string): Promise<void>;
    removeFcmKey(experienceName: string): Promise<void>;
    removeKeystore(experienceName: string): Promise<void>;
    private ensureCredentialsFetched;
}
