export declare type BundledNativeModules = Record<string, string>;
/**
 * Gets the bundledNativeModules.json for a given SDK version:
 * - Tries to fetch the data from the /sdks/:sdkVersion/native-modules API endpoint.
 * - If the data is missing on the server (it can happen for SDKs that are yet fully released)
 *    or there's a downtime, reads the local .json file from the "expo" package.
 * - For UNVERSIONED, returns the local .json file contents.
 */
export declare function getBundledNativeModulesAsync(projectRoot: string, sdkVersion: string): Promise<BundledNativeModules>;
