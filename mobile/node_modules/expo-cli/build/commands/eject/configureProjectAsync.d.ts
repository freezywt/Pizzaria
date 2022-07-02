import { ExpoConfig, ProjectConfig } from '@expo/config';
import { ModPlatform } from '@expo/config-plugins';
export declare function logConfig(config: ExpoConfig | ProjectConfig): void;
export default function configureManagedProjectAsync({ projectRoot, platforms, }: {
    projectRoot: string;
    platforms: ModPlatform[];
}): Promise<ExpoConfig>;
