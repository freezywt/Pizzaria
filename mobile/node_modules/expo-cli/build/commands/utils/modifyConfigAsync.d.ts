import { ExpoConfig } from '@expo/config';
export declare function attemptModification(projectRoot: string, edits: Partial<ExpoConfig>, exactEdits: Partial<ExpoConfig>): Promise<void>;
export declare function attemptAddingPluginsAsync(projectRoot: string, exp: Pick<ExpoConfig, 'plugins'>, plugins: string[]): Promise<void>;
export declare function warnAboutConfigAndThrow(type: string, message: string, edits: Partial<ExpoConfig>): void;
