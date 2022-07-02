export declare function assembleAsync({ androidProjectPath, variant, port, appName, }: {
    androidProjectPath: string;
    variant: string;
    port?: number;
    appName: string;
}): Promise<import("@expo/spawn-async").SpawnResult>;
export declare function installAsync({ androidProjectPath, variant, appName, port, }: {
    androidProjectPath: string;
    variant: string;
    appName: string;
    port?: number;
}): Promise<import("@expo/spawn-async").SpawnResult>;
export declare function spawnGradleAsync(projectRoot: string, { port, args }: {
    port?: number;
    args: string[];
}): Promise<import("@expo/spawn-async").SpawnResult>;
