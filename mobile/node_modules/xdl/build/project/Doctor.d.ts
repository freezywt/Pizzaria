export declare const NO_ISSUES = 0;
export declare const WARNING = 1;
export declare const ERROR = 2;
export declare const FATAL = 3;
export declare function validateWithoutNetworkAsync(projectRoot: string, options?: {
    skipSDKVersionRequirement?: boolean;
}): Promise<number>;
export declare function validateWithNetworkAsync(projectRoot: string, options?: {
    skipSDKVersionRequirement?: boolean;
}): Promise<number>;
export declare function validateExpoServersAsync(projectRoot: string): Promise<number>;
