import { ModPlatform } from '@expo/config-plugins';
export declare function platformsFromPlatform(platform?: string, { loose }?: {
    loose?: boolean;
}): ModPlatform[];
export declare function ensureValidPlatforms(platforms: ModPlatform[]): ModPlatform[];
export declare function assertPlatforms(platforms: ModPlatform[]): void;
