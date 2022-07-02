export declare function directoryExistsAsync(file: string): Promise<boolean>;
export declare function clearNativeFolder(projectRoot: string, folders: string[]): Promise<void>;
export declare function hasRequiredAndroidFilesAsync(projectRoot: string): Promise<boolean>;
export declare function hasRequiredIOSFilesAsync(projectRoot: string): Promise<boolean>;
export declare function promptToClearMalformedNativeProjectsAsync(projectRoot: string, checkPlatforms: string[]): Promise<void>;
