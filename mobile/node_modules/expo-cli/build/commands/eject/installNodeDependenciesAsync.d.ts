/**
 * Wraps PackageManager to install node modules and adds CLI logs.
 *
 * @param projectRoot
 */
export declare function installNodeDependenciesAsync(projectRoot: string, packageManager: 'yarn' | 'npm', { clean }: {
    clean: boolean;
}): Promise<void>;
