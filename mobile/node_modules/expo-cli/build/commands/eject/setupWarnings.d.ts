import { PackageJSONConfig } from '@expo/config';
/**
 * Some packages are not configured automatically on eject and may require
 * users to add some code, eg: to their AppDelegate.
 */
export declare function warnIfDependenciesRequireAdditionalSetup(pkg: PackageJSONConfig, sdkVersion?: string, appliedPlugins?: string[]): Record<string, string>;
export declare function getSetupWarnings({ pkg, sdkVersion, appliedPlugins, autoPlugins, }: {
    pkg: PackageJSONConfig;
    sdkVersion?: string;
    appliedPlugins: string[];
    autoPlugins: string[];
}): Record<string, string>;
