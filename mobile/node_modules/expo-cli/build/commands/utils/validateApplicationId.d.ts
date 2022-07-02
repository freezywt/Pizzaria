export declare function validateBundleId(value: string): boolean;
export declare function validatePackage(value: string): boolean;
/**
 * A quality of life method that provides a warning when the bundle ID is already in use.
 *
 * @param bundleId
 */
export declare function getBundleIdWarningAsync(bundleId: string): Promise<string | null>;
export declare function getPackageNameWarningAsync(packageName: string): Promise<string | null>;
