/// <reference types="node" />
export declare type Device = {
    pid?: string;
    name: string;
    type: 'emulator' | 'device';
    isBooted: boolean;
    isAuthorized: boolean;
};
export declare function getAllAvailableDevicesAsync(): Promise<Device[]>;
export declare function getAttachedDevicesAsync(): Promise<Device[]>;
export declare function isPlatformSupported(): boolean;
export declare function getAdbOutputAsync(args: string[]): Promise<string>;
export declare function getAdbFileOutputAsync(args: string[], encoding?: 'latin1'): Promise<string | Buffer>;
export declare function installExpoAsync({ device, url, version, }: {
    device: Device;
    url?: string;
    version?: string;
}): Promise<string>;
export declare function installOnDeviceAsync(device: Pick<Device, 'pid'>, { binaryPath }: {
    binaryPath: string;
}): Promise<string>;
export declare function isDeviceBootedAsync({ name, }?: {
    name?: string;
}): Promise<Device | null>;
export declare function uninstallExpoAsync(device: Device): Promise<string | undefined>;
export declare function upgradeExpoAsync({ url, version, device, }?: {
    url?: string;
    version?: string;
    device?: Device | null;
}): Promise<boolean>;
export declare function activateEmulatorWindowAsync(device: Pick<Device, 'type' | 'pid'>): Promise<void>;
/**
 * @param device Android device to open on
 * @param props.launchActivity Activity to launch `[application identifier]/.[main activity name]`, ex: `com.bacon.app/.MainActivity`
 */
export declare function openAppAsync(device: Pick<Device, 'pid' | 'type'>, { launchActivity, }: {
    launchActivity: string;
}): Promise<string>;
export declare function attemptToStartEmulatorOrAssertAsync(device: Device): Promise<Device | null>;
export declare function resolveApplicationIdAsync(projectRoot: string): Promise<string | null>;
export declare function openProjectAsync({ projectRoot, shouldPrompt, devClient, device, scheme, applicationId, launchActivity, }: {
    projectRoot: string;
    shouldPrompt?: boolean;
    devClient?: boolean;
    device?: Device;
    scheme?: string;
    applicationId?: string | null;
    launchActivity?: string;
}): Promise<{
    success: true;
    url: string;
} | {
    success: false;
    error: Error | string;
}>;
export declare function openWebProjectAsync({ projectRoot, shouldPrompt, }: {
    projectRoot: string;
    shouldPrompt?: boolean;
}): Promise<{
    success: true;
    url: string;
} | {
    success: false;
    error: string;
}>;
export declare function startAdbReverseAsync(projectRoot: string): Promise<boolean>;
export declare function stopAdbReverseAsync(projectRoot: string): Promise<void>;
/**
 * Checks whether `resizeMode` is set to `native` and if `true` analyzes provided images for splashscreen
 * providing `Logger` feedback upon problems.
 * @param projectRoot - directory of the expo project
 * @since SDK33
 */
export declare function checkSplashScreenImages(projectRoot: string): Promise<void>;
export declare function maybeStopAdbDaemonAsync(): Promise<boolean>;
export declare function promptForDeviceAsync(devices: Device[]): Promise<Device | null>;
export declare enum DeviceABI {
    arm = "arm",
    arm64 = "arm64",
    x64 = "x64",
    x86 = "x86",
    armeabiV7a = "armeabi-v7a",
    armeabi = "armeabi",
    universal = "universal"
}
declare type DeviceProperties = Record<string, string>;
/**
 * @returns string like '11' (i.e. Android 11)
 */
export declare function getDeviceSDKVersionAsync(device: Pick<Device, 'name' | 'pid'>): Promise<string>;
/**
 * @returns number like `30` (i.e. API 30)
 */
export declare function getDeviceAPIVersionAsync(device: Pick<Device, 'name' | 'pid'>): Promise<number>;
export declare function getDeviceABIsAsync(device: Pick<Device, 'name' | 'pid'>): Promise<DeviceABI[]>;
export declare function getPropertyForDeviceAsync(device: Pick<Device, 'name' | 'pid'>, name: string, shouldRefresh?: boolean): Promise<string>;
export declare function parseAdbDeviceProperties(devicePropertiesString: string): DeviceProperties;
export {};
