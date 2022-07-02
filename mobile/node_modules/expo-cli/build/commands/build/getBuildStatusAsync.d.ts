import { GetExpConfigOptions } from './startBuildAsync';
declare type JobState = 'pending' | 'started' | 'in-progress' | 'finished' | 'errored' | 'sent-to-queue';
export declare type TurtleMode = 'normal' | 'high' | 'high_only';
export interface BuildJobFields {
    id: string;
    experienceName: string;
    status: JobState;
    platform: 'ios' | 'android';
    userId: string | null;
    experienceId: string;
    artifactId: string | null;
    nonce: string | null;
    artifacts: {
        url?: string;
        manifestPlistUrl?: string;
    } | null;
    config: {
        buildType?: string;
        releaseChannel?: string;
        bundleIdentifier?: string;
    };
    logs: object | null;
    extraData: {
        request_id?: string;
        turtleMode?: TurtleMode;
    } | null;
    created: Date;
    updated: Date;
    expirationDate: Date;
    sdkVersion: string | null;
    turtleVersion: string | null;
    buildDuration: number | null;
    priority: string;
    accountId: string | null;
}
export declare type BuildStatusResult = {
    jobs?: BuildJobFields[];
    err?: null;
    userHasBuiltAppBefore: boolean;
    userHasBuiltExperienceBefore: boolean;
    canPurchasePriorityBuilds?: boolean;
    numberOfRemainingPriorityBuilds?: number;
    hasUnlimitedPriorityBuilds?: boolean;
};
export declare function getBuildStatusAsync(projectRoot: string, options?: GetExpConfigOptions): Promise<BuildStatusResult>;
export {};
