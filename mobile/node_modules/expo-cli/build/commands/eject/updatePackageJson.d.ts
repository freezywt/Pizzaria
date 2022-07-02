import { PackageJSONConfig } from '@expo/config';
export declare type DependenciesMap = {
    [key: string]: string | number;
};
export declare type DependenciesModificationResults = {
    hasNewDependencies: boolean;
    hasNewDevDependencies: boolean;
};
export declare function updatePackageJSONAsync({ projectRoot, tempDir, pkg, skipDependencyUpdate, }: {
    projectRoot: string;
    tempDir: string;
    pkg: PackageJSONConfig;
    skipDependencyUpdate?: string[];
}): Promise<DependenciesModificationResults>;
/**
 * Update package.json dependencies by combining the dependencies in the project we are ejecting
 * with the dependencies in the template project. Does the same for devDependencies.
 *
 * - The template may have some dependencies beyond react/react-native/react-native-unimodules,
 *   for example RNGH and Reanimated. We should prefer the version that is already being used
 *   in the project for those, but swap the react/react-native/react-native-unimodules versions
 *   with the ones in the template.
 * - The same applies to expo-updates -- since some native project configuration may depend on the
 *   version, we should always use the version of expo-updates in the template.
 */
export declare function updatePackageJSONDependencies({ projectRoot, tempDir, pkg, skipDependencyUpdate, }: {
    projectRoot: string;
    tempDir: string;
    pkg: PackageJSONConfig;
    skipDependencyUpdate?: string[];
}): DependenciesModificationResults;
/**
 * Create an object of type DependenciesMap a dependencies object or throw if not valid.
 *
 * @param dependencies - ideally an object of type {[key]: string} - if not then this will error.
 */
export declare function createDependenciesMap(dependencies: any): DependenciesMap;
/**
 * Returns true if the input string matches the default expo main field.
 *
 * - ./node_modules/expo/AppEntry
 * - ./node_modules/expo/AppEntry.js
 * - node_modules/expo/AppEntry.js
 * - expo/AppEntry.js
 * - expo/AppEntry
 *
 * @param input package.json main field
 */
export declare function isPkgMainExpoAppEntry(input?: string): boolean;
export declare function hashForDependencyMap(deps?: DependenciesMap): string;
export declare function createFileHash(contents: string): string;
export declare function shouldDeleteMainField(main?: any): boolean;
