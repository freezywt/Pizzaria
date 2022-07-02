export declare const baseTSConfigName = "expo/tsconfig.base";
export declare function queryFirstProjectTypeScriptFileAsync(projectRoot: string): Promise<null | string>;
export declare function resolveBaseTSConfig(projectRoot: string): string | null;
export declare function hasTSConfig(projectRoot: string): Promise<string | null>;
export declare function collectMissingPackages(projectRoot: string): {
    missing: {
        file: string;
        pkg: string;
        version?: string;
    }[];
    resolutions: Record<string, string>;
};
