export declare function findProjectRootAsync(base: string): Promise<{
    projectRoot: string;
    workflow: 'managed' | 'bare';
}>;
/** Returns true if `expo-updates` is in the `package.json` dependencies. */
export declare function hasExpoUpdatesInstalledAsync(projectRoot: string): Promise<boolean>;
export declare function usesOldExpoUpdatesAsync(projectRoot: string): Promise<boolean>;
export declare function validateGitStatusAsync(): Promise<boolean>;
