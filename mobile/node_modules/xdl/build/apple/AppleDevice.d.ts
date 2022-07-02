import { OnInstallProgressCallback } from './native-run/ios/lib';
import type { DeviceValues } from './native-run/ios/lib';
export declare function isEnabled(): boolean;
export declare function getConnectedDevices(): Promise<DeviceValues[]>;
export declare function runOnDevice({ udid, appPath, bundleId, waitForApp, deltaPath, onProgress, }: {
    udid: string;
    appPath: string;
    bundleId: string;
    waitForApp: boolean;
    deltaPath: string;
    onProgress: OnInstallProgressCallback;
}): Promise<void>;
