import { ExpoConfig } from '@expo/config';
export declare function getNamedPlugins(plugins: NonNullable<ExpoConfig['plugins']>): string[];
export declare function autoAddConfigPluginsAsync(projectRoot: string, exp: Pick<ExpoConfig, 'plugins'>, packages: string[]): Promise<void>;
