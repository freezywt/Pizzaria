import JsonFile from '@expo/json-file';
import { ConnectionType } from './internal';
export declare type UserSettingsData = {
    developmentCodeSigningId?: string;
    appleId?: string;
    accessToken?: string;
    auth?: UserData | null;
    ignoreBundledBinaries?: string[];
    openDevToolsAtStartup?: boolean;
    PATH?: string;
    sendTo?: string;
    uuid?: string;
};
export declare type UserData = {
    developmentCodeSigningId?: string;
    appleId?: string;
    userId?: string;
    username?: string;
    currentConnection?: ConnectionType;
    sessionSecret?: string;
};
declare function userSettingsFile(): string;
declare function userSettingsJsonFile(): JsonFile<UserSettingsData>;
declare function dotExpoHomeDirectory(): string;
declare function getAnonymousIdentifierAsync(): Promise<string>;
declare function accessToken(): string | null;
declare const UserSettings: JsonFile<UserSettingsData> & {
    dotExpoHomeDirectory: typeof dotExpoHomeDirectory;
    userSettingsFile: typeof userSettingsFile;
    userSettingsJsonFile: typeof userSettingsJsonFile;
    accessToken: typeof accessToken;
    getAnonymousIdentifierAsync: typeof getAnonymousIdentifierAsync;
    SETTINGS_FILE_NAME: string;
};
export default UserSettings;
