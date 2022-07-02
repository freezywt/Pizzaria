import { AppLookupParams } from '../api/IosApi';
import { AndroidCredentials, IosAppCredentials, IosCredentials, IosDistCredentials, IosPushCredentials } from '../credentials';
export declare function displayProjectCredentials(appLookupParams: AppLookupParams, appCredentials?: IosAppCredentials | null, pushKey?: IosPushCredentials | null, distCert?: IosDistCredentials | null): void;
export declare function displayIosCredentials(credentials: IosCredentials): Promise<void>;
export declare function displayIosAppCredentials(appCredentials: IosAppCredentials): void;
export declare function displayIosUserCredentials(userCredentials: IosPushCredentials | IosDistCredentials, credentials?: IosCredentials): void;
export declare function displayAndroidCredentials(credentialsList: AndroidCredentials[]): Promise<void>;
export declare function displayAndroidAppCredentials(credentials: AndroidCredentials): Promise<void>;
