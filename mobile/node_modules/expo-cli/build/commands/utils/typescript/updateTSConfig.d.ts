export declare const isTypeScriptSetupDisabled: boolean;
export declare function updateTSConfigAsync({ projectRoot, tsConfigPath, isBootstrapping, }: {
    projectRoot: string;
    tsConfigPath: string;
    isBootstrapping: boolean;
}): Promise<void>;
