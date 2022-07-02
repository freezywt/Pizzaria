import { ProjectTarget } from '@expo/config';
declare type ProjectStatus = 'running' | 'ill' | 'exited';
export declare type ProjectSettings = {
    scheme: string | null;
    hostType: 'localhost' | 'lan' | 'tunnel';
    lanType: 'ip' | 'hostname';
    dev: boolean;
    devClient: boolean;
    minify: boolean;
    urlRandomness: string | null;
    https: boolean;
    strict?: boolean;
};
export declare type Settings = ProjectSettings;
declare type PackagerInfo = {
    expoServerPort?: number | null;
    packagerPort?: number | null;
    packagerPid?: number | null;
    expoServerNgrokUrl?: string | null;
    packagerNgrokUrl?: string | null;
    ngrokPid?: number | null;
    devToolsPort?: number | null;
    webpackServerPort?: number | null;
    target?: ProjectTarget;
};
export declare type DeviceInfo = {
    installationId: string;
    lastUsed: number;
};
export declare type DevicesInfo = {
    devices: DeviceInfo[];
};
export declare function readAsync(projectRoot: string): Promise<ProjectSettings>;
export declare function setAsync(projectRoot: string, json: Partial<ProjectSettings>): Promise<ProjectSettings>;
export declare function readPackagerInfoAsync(projectRoot: string): Promise<PackagerInfo>;
export declare function getCurrentStatusAsync(projectRoot: string): Promise<ProjectStatus>;
export declare function setPackagerInfoAsync(projectRoot: string, json: Partial<PackagerInfo>): Promise<PackagerInfo>;
export declare function getDevicesInfoAsync(projectRoot: string): Promise<DevicesInfo>;
export declare function readDevicesInfoAsync(projectRoot: string): Promise<DevicesInfo>;
export declare function setDevicesInfoAsync(projectRoot: string, json: DevicesInfo): Promise<DevicesInfo>;
export declare function saveDevicesAsync(projectRoot: string, deviceIds: string | string[]): Promise<void>;
export declare function dotExpoProjectDirectory(projectRoot: string): string;
export declare function dotExpoProjectDirectoryExists(projectRoot: string): boolean;
export {};
