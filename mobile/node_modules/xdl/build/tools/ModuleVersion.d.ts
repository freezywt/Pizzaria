/** @deprecated just use the update-check npm package */
declare function createModuleVersionChecker(name: string, currentVersion: string): {
    checkAsync: () => Promise<{
        updateIsAvailable: boolean;
        latest: string;
        current: string;
        deprecated: unknown;
    }>;
};
export { createModuleVersionChecker };
