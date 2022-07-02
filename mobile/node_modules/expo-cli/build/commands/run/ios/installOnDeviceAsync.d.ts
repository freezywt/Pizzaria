/**
 * Get the app_delta folder for faster subsequent rebuilds on devices.
 *
 * @param bundleId
 * @returns
 */
export declare function getAppDeltaDirectory(bundleId: string): string;
export declare function installOnDeviceAsync(props: {
    bundle: string;
    bundleIdentifier: string;
    appDeltaDirectory: string;
    udid: string;
    deviceName: string;
}): Promise<void>;
