/// <reference types="node" />
import { ExpoConfig, ProjectTarget } from '@expo/config';
import { MessageSocket } from '@expo/dev-server';
import http from 'http';
export declare type StartOptions = {
    metroPort?: number;
    webpackPort?: number;
    isWebSocketsEnabled?: boolean;
    isRemoteReloadingEnabled?: boolean;
    devClient?: boolean;
    reset?: boolean;
    nonInteractive?: boolean;
    nonPersistent?: boolean;
    maxWorkers?: number;
    webOnly?: boolean;
    target?: ProjectTarget;
    platforms?: ExpoConfig['platforms'];
    forceManifestType?: 'expo-updates' | 'classic';
};
export declare function startDevServerAsync(projectRoot: string, startOptions: StartOptions): Promise<[http.Server, any, MessageSocket]>;
