import { SimulatorDevice } from '../SimControl';
export declare function isEnabled(): boolean;
export declare class CoreSimulatorError extends Error {
    message: string;
    code?: "MALFORMED_BINARY" | "INVALID_UDID" | undefined;
    constructor(message: string, code?: "MALFORMED_BINARY" | "INVALID_UDID" | undefined);
}
export declare function listDevicesAsync(): Promise<SimulatorDevice[]>;
export declare function getDeviceInfoAsync({ udid, }?: {
    udid?: string;
}): Promise<SimulatorDevice>;
export declare function devicePlistToSimulatorDevice(deviceDirectory: string, data: any): SimulatorDevice;
/**
 * Get UDID for the first booted simulator. It's unclear if this is the exact method used by  `xcrun simctl` to determine which device is "booted".
 *
 * @returns EFEEA6EF-E3F5-4EDE-9B72-29EAFA7514AE
 */
export declare function getBootedDeviceAsync(): Promise<{
    UDID: string;
} | null>;
/**
 * Returns the local path for the installed binary.app on a given Apple simulator. Returns null when the app isn't installed.
 *
 * This can be used as a replacement for `xcrun simctl get_app_container <udid> <bundleIdentifier>` but it's over 200x faster.
 *
 * @param props.udid device udid.
 * @param props.bundleIdentifier bundle identifier for app
 * @returns local file path to installed app binary, e.g. '/Users/evanbacon/Library/Developer/CoreSimulator/Devices/EFEEA6EF-E3F5-4EDE-9B72-29EAFA7514AE/data/Containers/Bundle/Application/FA43A0C6-C2AD-442D-B8B1-EAF3E88CF3BF/Exponent-2.21.3.tar.app'
 */
export declare function getContainerPathAsync({ udid, bundleIdentifier, }: {
    udid: string;
    bundleIdentifier: string;
}): Promise<string | null>;
