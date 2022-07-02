export declare function findReusableBuildAsync(releaseChannel: string, platform: string, sdkVersion: string, slug: string, owner?: string): Promise<{
    downloadUrl?: string;
    canReuse: boolean;
}>;
