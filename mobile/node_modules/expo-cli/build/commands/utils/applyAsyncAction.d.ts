import type { Command } from 'commander';
export declare function applyAsyncActionProjectDir<Options = Record<string, any>>(command: Command, resolve: () => Promise<{
    actionAsync: (projectRoot: string, options: Options) => Promise<unknown>;
}>, settings?: {
    checkConfig?: boolean;
    skipSDKVersionRequirement?: true;
}): void;
export declare function applyAsyncAction<Args = string[], Options = Record<string, any>>(command: Command, resolve: () => Promise<{
    actionAsync: (args: Args, options: Options) => Promise<unknown>;
}>): void;
export declare function applyAnyAsyncAction<Options = Record<string, any>>(command: Command, resolve: () => Promise<{
    actionAsync: (options: Options) => Promise<unknown>;
}>): void;
