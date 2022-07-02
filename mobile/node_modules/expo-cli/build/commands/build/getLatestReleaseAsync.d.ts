declare type Release = {
    fullName: string;
    channel: string;
    channelId: string;
    publicationId: string;
    appVersion: string;
    sdkVersion: string;
    publishedTime: string;
    platform: string;
};
export declare function getLatestReleaseAsync(projectRoot: string, options: {
    releaseChannel: string;
    platform: string;
    owner?: string;
}): Promise<Release | null>;
export {};
