export declare function isInstalledAsync(): Promise<boolean>;
export declare function installOnDeviceAsync(props: {
    bundle: string;
    appDeltaDirectory?: string;
    udid: string;
    deviceName: string;
}): Promise<void>;
export declare function assertInstalledAsync(): Promise<void>;
