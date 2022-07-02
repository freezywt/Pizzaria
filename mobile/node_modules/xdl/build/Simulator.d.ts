import { ensureSimulatorAppRunningAsync } from './apple/utils/ensureSimulatorAppRunningAsync';
import { SimControl } from './internal';
export declare function isPlatformSupported(): boolean;
/**
 * Ensure Xcode is installed an recent enough to be used with Expo.
 *
 * @return true when Xcode is installed, false when the process should end.
 */
export declare function ensureXcodeInstalledAsync(): Promise<boolean>;
export declare function ensureXcodeCommandLineToolsInstalledAsync(): Promise<boolean>;
export declare function isSimulatorInstalledAsync(): Promise<boolean>;
/**
 * Ensure a simulator is booted and the Simulator app is opened.
 * This is where any timeout related error handling should live.
 */
export declare function ensureSimulatorOpenAsync({ udid, osType }?: {
    udid?: string;
    osType?: string;
}, tryAgain?: boolean): Promise<SimControl.SimulatorDevice>;
export declare function isSimulatorBootedAsync({ udid, }?: {
    udid?: string;
}): Promise<SimControl.SimulatorDevice | null>;
export declare function activateSimulatorWindowAsync(): Promise<string>;
export declare function closeSimulatorAppAsync(): Promise<string>;
export declare function isExpoClientInstalledOnSimulatorAsync({ udid, }: {
    udid: string;
}): Promise<boolean>;
export declare function waitForExpoClientInstalledOnSimulatorAsync({ udid, }: {
    udid: string;
}): Promise<boolean>;
export declare function waitForExpoClientUninstalledOnSimulatorAsync({ udid, }: {
    udid: string;
}): Promise<boolean>;
export declare function expoVersionOnSimulatorAsync({ udid, }: {
    udid: string;
}): Promise<string | null>;
export declare function doesExpoClientNeedUpdatedAsync(simulator: Pick<SimControl.SimulatorDevice, 'udid'>, sdkVersion?: string): Promise<boolean>;
export declare function _downloadSimulatorAppAsync(url?: string, downloadProgressCallback?: (roundedProgress: number) => void): Promise<string>;
export declare function installExpoOnSimulatorAsync({ url, simulator, version, }: {
    simulator: Pick<SimControl.SimulatorDevice, 'name' | 'udid'>;
    url?: string;
    version?: string;
}): Promise<any>;
export declare function uninstallExpoAppFromSimulatorAsync({ udid }?: {
    udid?: string;
}): Promise<void>;
export declare function upgradeExpoAsync(options?: {
    udid?: string;
    url?: string;
    version?: string;
}): Promise<boolean>;
export declare function resolveApplicationIdAsync(projectRoot: string): Promise<any>;
export declare function openProjectAsync({ projectRoot, shouldPrompt, devClient, udid, scheme, skipNativeLogs, applicationId, }: {
    projectRoot: string;
    shouldPrompt?: boolean;
    devClient?: boolean;
    scheme?: string;
    udid?: string;
    skipNativeLogs?: boolean;
    applicationId?: string;
}): Promise<{
    success: true;
    url: string;
    udid: string;
    bundleIdentifier: string;
} | {
    success: false;
    error: string;
}>;
export declare function streamLogsAsync({ bundleIdentifier, udid, }: {
    bundleIdentifier: string;
    udid: string;
}): Promise<void>;
export declare function openWebProjectAsync({ projectRoot, shouldPrompt, }: {
    shouldPrompt: boolean;
    projectRoot: string;
}): Promise<{
    success: true;
    url: string;
} | {
    success: false;
    error: string;
}>;
/**
 * Sort the devices so the last simulator that was opened (user's default) is the first suggested.
 *
 * @param devices
 */
export declare function sortDefaultDeviceToBeginningAsync(devices: SimControl.SimulatorDevice[], osType?: string): Promise<SimControl.SimulatorDevice[]>;
export declare function promptForSimulatorAsync(devices: SimControl.SimulatorDevice[], osType?: string): Promise<SimControl.SimulatorDevice | null>;
export { ensureSimulatorAppRunningAsync };
