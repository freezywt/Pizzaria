import { AppJSONConfig, ProjectConfig } from '@expo/config';
export declare function ensureWebSupportSetupAsync(projectRoot: string, { skipCache }?: {
    skipCache?: boolean;
}): Promise<boolean>;
export declare function isWebPlatformExcluded(rootConfig: AppJSONConfig): boolean;
export declare function shouldSetupWebSupportAsync(projectRoot: string): Promise<{
    failureReason: string;
} | ProjectConfig>;
export declare function createInstallCommand({ isYarn, packages, }: {
    isYarn: boolean;
    packages: {
        file: string;
        pkg: string;
        version?: string | undefined;
    }[];
}): string;
