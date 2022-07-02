import { SpawnOptions, SpawnResult } from '@expo/spawn-async';
declare type DeviceState = 'Shutdown' | 'Booted';
export declare type SimulatorDevice = {
    availabilityError: 'runtime profile not found';
    /**
     * '/Users/name/Library/Developer/CoreSimulator/Devices/00E55DC0-0364-49DF-9EC6-77BE587137D4/data'
     */
    dataPath: string;
    /**
     * '/Users/name/Library/Logs/CoreSimulator/00E55DC0-0364-49DF-9EC6-77BE587137D4'
     */
    logPath: string;
    /**
     * '00E55DC0-0364-49DF-9EC6-77BE587137D4'
     */
    udid: string;
    /**
     * com.apple.CoreSimulator.SimRuntime.tvOS-13-4
     */
    runtime: string;
    isAvailable: boolean;
    /**
     * 'com.apple.CoreSimulator.SimDeviceType.Apple-TV-1080p'
     */
    deviceTypeIdentifier: string;
    state: DeviceState;
    /**
     * 'Apple TV'
     */
    name: string;
    osType: OSType;
    /**
     * '13.4'
     */
    osVersion: string;
    /**
     * 'iPhone 11 (13.6)'
     */
    windowName: string;
};
export declare type XCTraceDevice = {
    /**
     * '00E55DC0-0364-49DF-9EC6-77BE587137D4'
     */
    udid: string;
    /**
     * 'Apple TV'
     */
    name: string;
    deviceType: 'device' | 'catalyst';
    /**
     * '13.4'
     */
    osVersion: string;
};
declare type OSType = 'iOS' | 'tvOS' | 'watchOS' | 'macOS';
declare type PermissionName = 'all' | 'calendar' | 'contacts-limited' | 'contacts' | 'location' | 'location-always' | 'photos-add' | 'photos' | 'media-library' | 'microphone' | 'motion' | 'reminders' | 'siri';
declare type SimulatorDeviceList = {
    devices: {
        [runtime: string]: SimulatorDevice[];
    };
};
export declare function getDefaultSimulatorDeviceUDIDAsync(): Promise<string | null>;
/**
 * Returns the local path for the installed tar.app. Returns null when the app isn't installed.
 *
 * @param props.udid device udid.
 * @param props.bundleIdentifier bundle identifier for app
 * @returns local file path to installed app binary, e.g. '/Users/evanbacon/Library/Developer/CoreSimulator/Devices/EFEEA6EF-E3F5-4EDE-9B72-29EAFA7514AE/data/Containers/Bundle/Application/FA43A0C6-C2AD-442D-B8B1-EAF3E88CF3BF/Exponent-2.21.3.tar.app'
 */
export declare function getContainerPathAsync({ udid, bundleIdentifier, }: {
    udid: string;
    bundleIdentifier: string;
}): Promise<string | null>;
export declare function waitForDeviceToBootAsync({ udid, }: Pick<SimulatorDevice, 'udid'>): Promise<SimulatorDevice | null>;
export declare function openURLAsync(options: {
    udid?: string;
    url: string;
}): Promise<void>;
export declare function openBundleIdAsync(options: {
    udid?: string;
    bundleIdentifier: string;
}): Promise<SpawnResult>;
export declare function bootAsync({ udid }: {
    udid: string;
}): Promise<SimulatorDevice | null>;
export declare function runBootAsync({ udid }: {
    udid: string;
}): Promise<void>;
export declare function installAsync(options: {
    udid: string;
    dir: string;
}): Promise<any>;
export declare function uninstallAsync(options: {
    udid?: string;
    bundleIdentifier: string;
}): Promise<any>;
export declare function listAsync(type: 'devices' | 'devicetypes' | 'runtimes' | 'pairs', query?: string | 'available'): Promise<SimulatorDeviceList>;
export declare function listSimulatorDevicesAsync(): Promise<SimulatorDevice[]>;
/**
 * Get a list of all connected devices.
 */
export declare function listDevicesAsync(): Promise<XCTraceDevice[]>;
export declare function shutdownAsync(udid?: string): Promise<SpawnResult | null>;
export declare function updatePermissionsAsync(udid: string, action: 'grant' | 'revoke' | 'reset', permission: PermissionName, bundleIdentifier?: string): Promise<SpawnResult>;
export declare function setAppearanceAsync(udid: string, theme: 'light' | 'dark'): Promise<SpawnResult>;
export declare function eraseAsync(udid: string): Promise<SpawnResult>;
export declare function eraseAllAsync(): Promise<SpawnResult>;
export declare function addMediaAsync(udid: string, mediaPath: string): Promise<SpawnResult>;
export declare function captureScreenAsync(udid: string, captureType: 'screenshot' | 'recordVideo', outputFilePath: string): Promise<SpawnResult>;
export declare function deleteUnavailableAsync(): Promise<SpawnResult>;
export declare function simctlAsync([command, ...args]: (string | undefined)[], options?: SpawnOptions): Promise<SpawnResult>;
export declare function isLicenseOutOfDate(text: string): boolean;
export declare function isXcrunInstalledAsync(): Promise<boolean>;
export declare function xcrunAsync(args: string[], options?: SpawnOptions): Promise<SpawnResult>;
export declare function parseXcrunError(e: any): Error;
export declare function xcrunWithLogging(args: string[], options?: SpawnOptions): Promise<SpawnResult>;
export {};
