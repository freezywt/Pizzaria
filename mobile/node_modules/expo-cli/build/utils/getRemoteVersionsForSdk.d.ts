export declare type DependencyList = Record<string, string>;
export declare const getRemoteVersionsForSdk: (sdkVersion?: string | undefined) => Promise<DependencyList>;
