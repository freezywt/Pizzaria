import { ExpoConfig, PackageJSONConfig } from '@expo/config';
import { ModPlatform } from '@expo/config-plugins';
/**
 * If an Expo config file does not exist, write a new one using the in-memory config.
 *
 * @param projectRoot
 */
export declare function ensureConfigExistsAsync(projectRoot: string): Promise<void>;
export declare function ensureConfigAsync({ projectRoot, platforms, }: {
    projectRoot: string;
    platforms: ModPlatform[];
}): Promise<{
    exp: ExpoConfig;
    pkg: PackageJSONConfig;
}>;
