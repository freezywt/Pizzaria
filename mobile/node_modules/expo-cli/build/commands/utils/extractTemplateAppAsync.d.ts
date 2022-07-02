import { ExpoConfig } from '@expo/config';
/**
 * Extract a template app to a given file path and clean up any properties left over from npm to
 * prepare it for usage.
 */
export declare function extractAndPrepareTemplateAppAsync(npmPackageName: string, projectRoot: string, config: {
    expo: Partial<ExpoConfig>;
    name?: string;
}): Promise<string>;
