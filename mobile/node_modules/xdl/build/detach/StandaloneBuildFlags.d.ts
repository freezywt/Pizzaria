declare type StandaloneBuildConfiguration = 'Debug' | 'Release';
declare type StandaloneBuildAndroidFlags = {
    keystore: string;
    keystorePassword: string;
    keyAlias: string;
    keyPassword: string;
    outputFile: string | null;
};
declare type StandaloneBuildIosFlags = {
    workspaceSourcePath: string;
    appleTeamId?: string | null;
    buildType?: string;
    bundleExecutable?: string;
};
declare class StandaloneBuildFlags {
    configuration: StandaloneBuildConfiguration;
    isExpoClientBuild: () => boolean;
    android?: StandaloneBuildAndroidFlags;
    ios?: StandaloneBuildIosFlags;
    static createEmpty: () => StandaloneBuildFlags;
    static createIos: (configuration: StandaloneBuildConfiguration, ios?: StandaloneBuildIosFlags | undefined) => StandaloneBuildFlags;
    static createAndroid: (configuration: StandaloneBuildConfiguration, android?: StandaloneBuildAndroidFlags | undefined) => StandaloneBuildFlags;
}
export default StandaloneBuildFlags;
