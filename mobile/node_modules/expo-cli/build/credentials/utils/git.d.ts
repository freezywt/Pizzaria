interface GitStatusOptions {
    showUntracked?: boolean;
}
export declare function gitStatusAsync({ showUntracked }?: GitStatusOptions): Promise<string>;
export {};
