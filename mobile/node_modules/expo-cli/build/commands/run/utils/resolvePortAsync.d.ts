export declare function resolvePortAsync(projectRoot: string, { reuseExistingPort, defaultPort, fallbackPort, }?: {
    reuseExistingPort?: boolean;
    defaultPort?: string | number;
    fallbackPort?: number;
}): Promise<number | null>;
