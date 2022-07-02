export declare function validateName(name?: string): string | true;
export declare function isFolderNameForbidden(folderName: string): boolean;
export declare function getConflictsForDirectory(projectRoot: string, tolerableFiles?: string[]): string[];
export declare function assertFolderEmptyAsync({ projectRoot, folderName, overwrite, }: {
    projectRoot: string;
    folderName?: string;
    overwrite: boolean;
}): Promise<boolean>;
export declare type PackageManagerName = 'npm' | 'yarn';
export declare function resolvePackageManager(options: {
    yarn?: boolean;
    npm?: boolean;
    install?: boolean;
}): PackageManagerName;
export declare function installNodeDependenciesAsync(projectRoot: string, packageManager: PackageManagerName, flags?: {
    silent: boolean;
}): Promise<void>;
export declare function getChangeDirectoryPath(projectRoot: string): string;
export declare function installCocoaPodsAsync(projectRoot: string): Promise<boolean>;
