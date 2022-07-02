import { ExpoConfig } from '@expo/config-types';
declare type StartOptions = {
    isWebSocketsEnabled?: boolean;
    isRemoteReloadingEnabled?: boolean;
    devClient?: boolean;
    reset?: boolean;
    nonInteractive?: boolean;
    nonPersistent?: boolean;
    maxWorkers?: number;
    webOnly?: boolean;
    platforms?: ExpoConfig['platforms'];
};
export declare function shouldOpenDevToolsOnStartupAsync(): Promise<boolean>;
export declare function openDeveloperTools(url: string): Promise<void>;
export declare function startAsync(projectRoot: string, options: StartOptions): Promise<void>;
export {};
