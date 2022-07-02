export declare function waitForSimulatorAppToStart(): Promise<boolean>;
/**
 * I think the app can be open while no simulators are booted.
 */
export declare function isSimulatorAppRunningAsync(): Promise<boolean>;
export declare function ensureSimulatorAppRunningAsync({ udid }: {
    udid?: string;
}): Promise<void>;
export declare function openSimulatorAppAsync({ udid }: {
    udid?: string;
}): Promise<void>;
export declare function killAllAsync(): Promise<import("@expo/spawn-async").SpawnResult>;
