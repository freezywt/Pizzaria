export declare function ensureTypeScriptSetupAsync(projectRoot: string): Promise<void>;
export declare function shouldSetupTypeScriptAsync(projectRoot: string): Promise<{
    isBootstrapping: boolean;
} | null>;
