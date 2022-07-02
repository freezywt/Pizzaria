export declare type BuildCreatedResult = {
    id: string;
    ids: string[];
    priority: 'normal' | 'high';
    canPurchasePriorityBuilds: boolean;
    numberOfRemainingPriorityBuilds: number;
    hasUnlimitedPriorityBuilds: boolean;
};
export declare type GetExpConfigOptions = {
    current?: boolean;
    mode?: string;
    platform?: 'android' | 'ios' | 'all';
    expIds?: string[];
    type?: string;
    releaseChannel?: string;
    bundleIdentifier?: string;
    publicUrl?: string;
    sdkVersion?: string;
};
export declare function validateOptions(options: any): void;
export declare function getExpAsync(projectRoot: string, options: Pick<GetExpConfigOptions, 'publicUrl' | 'mode' | 'platform'>): Promise<{
    exp: any;
    configName: string;
    configPrefix: string;
}>;
export declare function startBuildAsync(projectRoot: string, options?: GetExpConfigOptions): Promise<BuildCreatedResult>;
