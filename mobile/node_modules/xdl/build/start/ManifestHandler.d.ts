/// <reference types="node" />
import { ExpoAppManifest, ExpoConfig, ExpoGoConfig } from '@expo/config';
import express from 'express';
import http from 'http';
import { ProjectSettings } from '../internal';
interface HostInfo {
    host: string;
    server: 'xdl';
    serverVersion: string;
    serverDriver: string | null;
    serverOS: NodeJS.Platform;
    serverOSVersion: string;
}
declare type PackagerOptions = ProjectSettings.ProjectSettings;
export declare function stripPort(host: string | undefined): string | undefined;
export declare function getPackagerOptionsAsync(projectRoot: string): Promise<[ProjectSettings.ProjectSettings, PackagerOptions]>;
export declare function getBundleUrlAsync({ projectRoot, platform, projectSettings, bundleUrlPackagerOpts, mainModuleName, hostname, }: {
    platform: string;
    hostname?: string;
    mainModuleName: string;
    projectRoot: string;
    projectSettings: PackagerOptions;
    bundleUrlPackagerOpts: PackagerOptions;
}): Promise<string>;
export declare function getManifestHandler(projectRoot: string): (req: express.Request | http.IncomingMessage, res: express.Response | http.ServerResponse, next: (err?: Error | undefined) => void) => Promise<void>;
export declare function getExpoGoConfig({ projectRoot, projectSettings, mainModuleName, hostname, }: {
    projectRoot: string;
    projectSettings: ProjectSettings.ProjectSettings;
    mainModuleName: string;
    hostname: string | undefined;
}): Promise<ExpoGoConfig>;
export declare function getManifestResponseAsync({ projectRoot, host, platform, acceptSignature, }: {
    projectRoot: string;
    platform: string;
    host?: string;
    acceptSignature?: string | string[];
}): Promise<{
    exp: ExpoAppManifest;
    manifestString: string;
    hostInfo: HostInfo;
}>;
export declare function getSignedManifestStringAsync(manifest: Partial<ExpoAppManifest>, currentSession: {
    sessionSecret?: string;
    accessToken?: string;
}): Promise<any>;
export declare function getUnsignedManifestString(manifest: ExpoConfig): string;
export {};
