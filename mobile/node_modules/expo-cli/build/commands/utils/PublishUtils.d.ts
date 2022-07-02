export declare type HistoryOptions = {
    releaseChannel?: string;
    count?: number;
    platform?: 'android' | 'ios';
    raw?: boolean;
    sdkVersion?: string;
    runtimeVersion?: string;
};
export declare type DetailOptions = {
    publishId?: string;
    raw?: boolean;
};
export declare type SetOptions = {
    releaseChannel: string;
    publishId: string;
};
export declare type RollbackOptions = {
    releaseChannel: string;
    sdkVersion: string;
    runtimeVersion?: string;
    platform?: 'android' | 'ios';
    parent?: {
        nonInteractive?: boolean;
    };
};
export declare type Publication = {
    fullName: string;
    channel: string;
    channelId: string;
    publicationId: string;
    appVersion: string;
    sdkVersion: string;
    runtimeVersion?: string;
    publishedTime: string;
    platform: 'android' | 'ios';
};
export declare type PublicationDetail = {
    manifest?: {
        [key: string]: string;
    };
    publishedTime: string;
    publishingUsername: string;
    packageUsername: string;
    packageName: string;
    fullName: string;
    hash: string;
    sdkVersion: string;
    runtimeVersion?: string;
    s3Key: string;
    s3Url: string;
    abiVersion: string | null;
    bundleUrl: string | null;
    platform: string;
    version: string;
    revisionId: string;
    channels: {
        [key: string]: string;
    }[];
    publicationId: string;
};
export declare function getPublishHistoryAsync(projectRoot: string, options: HistoryOptions): Promise<any>;
export declare function setPublishToChannelAsync(projectRoot: string, options: SetOptions): Promise<any>;
export declare function rollbackPublicationFromChannelAsync(projectRoot: string, options: RollbackOptions): Promise<void>;
export declare function getPublicationDetailAsync(projectRoot: string, options: DetailOptions): Promise<PublicationDetail>;
export declare function printPublicationDetailAsync(detail: PublicationDetail, options: DetailOptions): Promise<void>;
