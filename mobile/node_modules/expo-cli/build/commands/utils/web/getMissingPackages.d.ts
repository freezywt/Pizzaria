import { ExpoConfig } from '@expo/config-types';
export declare type ResolvedPackage = {
    file: string;
    pkg: string;
    version?: string;
};
export declare function collectMissingPackages(projectRoot: string, requiredPackages: ResolvedPackage[]): {
    missing: ResolvedPackage[];
    resolutions: Record<string, string>;
};
/**
 * Collect missing packages given a list of required packages.
 * Any missing packages will be versioned to the known versions for the current SDK.
 *
 * @param projectRoot
 * @param props.requiredPackages list of required packages to check for
 * @returns list of missing packages and resolutions to existing packages.
 */
export declare function getMissingPackagesAsync(projectRoot: string, { exp, requiredPackages, }: {
    exp?: ExpoConfig;
    requiredPackages: ResolvedPackage[];
}): Promise<{
    missing: ResolvedPackage[];
    resolutions: Record<string, string>;
}>;
export declare function mutatePackagesWithKnownVersionsAsync(exp: ExpoConfig, packages: ResolvedPackage[]): Promise<ResolvedPackage[]>;
