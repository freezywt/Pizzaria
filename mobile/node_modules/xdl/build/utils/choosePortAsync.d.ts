export declare function choosePortAsync(projectRoot: string, { defaultPort, host, reuseExistingPort, }: {
    defaultPort: number;
    host?: string;
    reuseExistingPort?: boolean;
}): Promise<number | null>;
