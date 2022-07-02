export declare function maybeBailOnWorkflowWarning({ projectRoot, platform, nonInteractive, }: {
    projectRoot: string;
    platform: 'ios' | 'android';
    nonInteractive: boolean;
}): Promise<boolean>;
export declare function assertReleaseChannel(releaseChannel: any): asserts releaseChannel;
export declare function assertPublicUrl(publicUrl: any): void;
export declare function checkIfSdkIsSupported(sdkVersion: string, platform: 'android' | 'ios'): Promise<void>;
export declare function askBuildType<T extends string>(typeFromFlag: T, availableTypes: Record<T, string>): Promise<T>;
