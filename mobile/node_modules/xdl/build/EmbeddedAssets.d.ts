import { ExpoAppManifest, PackageJSONConfig, ProjectTarget } from '@expo/config';
export declare type EmbeddedAssetsConfiguration = {
    projectRoot: string;
    pkg: PackageJSONConfig;
    exp: ExpoAppManifest;
    releaseChannel?: string;
    iosManifestUrl: string;
    iosManifest: any;
    iosBundle: string | Uint8Array;
    androidManifestUrl: string;
    androidManifest: any;
    androidBundle: string | Uint8Array;
    target: ProjectTarget;
};
export declare function configureAsync(config: EmbeddedAssetsConfiguration): Promise<void>;
export declare function getEmbeddedManifestPath(platform: 'ios' | 'android', projectRoot: string, exp: ExpoAppManifest): string;
export declare function shouldEmbedAssetsForExpoUpdates(projectRoot: string, exp: ExpoAppManifest, pkg: PackageJSONConfig, target: ProjectTarget): boolean;
/** The code below here is duplicated from expo-cli currently **/
export declare function getIOSPaths(projectRoot: string): {
    projectName: string;
    iosProjectDirectory: string;
    iosSupportingDirectory: string;
    iconPath: string;
};
