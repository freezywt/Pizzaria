import { ExpoConfig } from '@expo/config';
export declare type SDKVersion = {
    androidExpoViewUrl?: string;
    expoReactNativeTag: string;
    exponentReactNativeTag?: string;
    expokitNpmPackage?: string;
    facebookReactNativeVersion: string;
    facebookReactVersion?: string;
    iosExpoViewUrl?: string;
    iosExponentViewUrl?: string;
    iosVersion?: string;
    isDeprecated?: boolean;
    packagesToInstallWhenEjecting?: {
        [name: string]: string;
    };
    releaseNoteUrl?: string;
    iosClientUrl?: string;
    iosClientVersion?: string;
    androidClientUrl?: string;
    androidClientVersion?: string;
    relatedPackages?: {
        [name: string]: string;
    };
    beta?: boolean;
};
export declare type SDKVersions = {
    [version: string]: SDKVersion;
};
declare type TurtleSDKVersions = {
    android: string[];
    ios: string[];
};
declare type TurtleSDKVersionsOld = {
    android: string;
    ios: string;
};
declare type Versions = {
    androidUrl: string;
    androidVersion: string;
    iosUrl: string;
    iosVersion: string;
    sdkVersions: SDKVersions;
    starterApps: unknown;
    templates: unknown[];
    templatesv2: unknown[];
    turtleSdkVersions: TurtleSDKVersionsOld;
};
export declare function versionsAsync(options?: {
    skipCache?: boolean;
}): Promise<Versions>;
export declare function sdkVersionsAsync(): Promise<SDKVersions>;
export declare function releasedSdkVersionsAsync(): Promise<SDKVersions>;
export declare function gteSdkVersion(expJson: Pick<ExpoConfig, 'sdkVersion'>, sdkVersion: string): boolean;
export declare function lteSdkVersion(expJson: Pick<ExpoConfig, 'sdkVersion'>, sdkVersion: string): boolean;
export declare function parseSdkVersionFromTag(tag: string): string;
export declare function newestReleasedSdkVersionAsync(): Promise<{
    version: string;
    data: SDKVersion | null;
}>;
export declare function oldestSupportedMajorVersionAsync(): Promise<number>;
export declare function canTurtleBuildSdkVersion(sdkVersion: string, platform: keyof TurtleSDKVersions): Promise<boolean>;
export {};
