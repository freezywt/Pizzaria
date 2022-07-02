import { ExpoAppManifest, ExpoConfig, PackageJSONConfig, ProjectTarget } from '@expo/config';
export declare type PublishOptions = {
    releaseChannel?: string;
    target?: ProjectTarget;
    resetCache?: boolean;
    maxWorkers?: number;
    quiet?: boolean;
};
export declare function getPublishExpConfigAsync(projectRoot: string, options?: Pick<PublishOptions, 'releaseChannel'>): Promise<{
    exp: ExpoAppManifest;
    pkg: PackageJSONConfig;
    hooks: ExpoConfig['hooks'];
}>;
