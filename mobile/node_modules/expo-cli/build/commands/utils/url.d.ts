export declare function getExpoDomainUrl(): string;
export declare function constructBuildLogsUrl({ buildId, username, projectSlug, }: {
    buildId: string;
    username?: string;
    projectSlug?: string;
    v2?: boolean;
}): string;
export declare function constructTurtleStatusUrl(): string;
export declare function constructArtifactUrl(artifactId: string): string;
export declare function isUrlAvailableAsync(url: string): Promise<boolean>;
