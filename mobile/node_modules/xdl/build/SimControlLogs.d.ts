export declare type SimControlLog = {
    /**
     * 258753568922927108
     */
    traceID: number;
    /**
     *
     * "Connection 1: done",
     */
    eventMessage: string;
    /**
     * "logEvent" | "activityCreateEvent",
     */
    eventType: 'logEvent' | 'activityCreateEvent';
    source: null | {
        /**
         * 'RCTDefaultLogFunction_block_invoke' | '__TCC_CRASHING_DUE_TO_PRIVACY_VIOLATION__'
         */
        symbol: string;
        line: number;
        /**
         * 'TCC' | 'Security' | 'CFNetwork' | 'libnetwork.dylib' | 'myapp'
         *
         * TCC is apple sys, it means "Transparency, Consent, and Control"
         */
        image: string;
        /**
         * 'RCTLog.mm' | ''
         */
        file: string;
    };
    /**
     * "Connection %llu: done"
     */
    formatString: string;
    /**
     * 0
     */
    activityIdentifier: number;
    subsystem: '' | 'com.apple.network' | 'com.facebook.react.log' | 'com.apple.TCC' | 'com.apple.CoreTelephony' | 'com.apple.WebKit' | 'com.apple.runningboard' | string;
    category: '' | 'access' | 'connection' | 'plugin';
    /**
     * "2021-03-15 15:36:28.004331-0700"
     */
    timestamp: string;
    /**
     * 706567072091713
     */
    machTimestamp: number;
    /**
     * "Default"
     */
    messageType: 'Default' | 'Error';
    /**
     * 15192
     */
    processID: number;
};
export declare function onMessage(simLog: SimControlLog): void;
export declare function isStreamingLogs(udid: string): boolean;
export declare function streamLogs({ pid, udid }: {
    pid: string;
    udid: string;
}): void;
export declare function detachStream(udid: string): Promise<void>;
/**
 *
 * @param udid
 * @param bundleIdentifier
 * @returns Image name like `Exponent` and `null` when the app is not installed on the provided simulator.
 */
export declare function getImageNameFromBundleIdentifierAsync(udid: string, bundleIdentifier: string): Promise<string | null>;
export declare function getImageNameFromContainerPath(binaryPath: string): string;
