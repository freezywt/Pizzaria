import { ExpoConfig } from '@expo/config';
import { ModPlatform } from '@expo/config-plugins';
export declare type EjectAsyncOptions = {
    verbose?: boolean;
    force?: boolean;
    template?: string;
    install?: boolean;
    packageManager?: 'npm' | 'yarn';
    platforms: ModPlatform[];
    skipDependencyUpdate?: string[];
};
export declare type PrebuildResults = {
    exp: ExpoConfig;
    hasNewProjectFiles: boolean;
    platforms: ModPlatform[];
    podInstall: boolean;
    nodeInstall: boolean;
    packageManager: string;
};
/**
 * Entry point into the prebuild process, delegates to other helpers to perform various steps.
 *
 * 1. Create native projects (ios, android)
 * 2. Install node modules
 * 3. Apply config to native projects
 * 4. Install CocoaPods
 */
export declare function prebuildAsync(projectRoot: string, { platforms, ...options }: EjectAsyncOptions): Promise<PrebuildResults>;
