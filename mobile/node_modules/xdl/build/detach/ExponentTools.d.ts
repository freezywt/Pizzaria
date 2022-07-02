import { ExpoConfig } from '@expo/config';
import { SpawnOptions, SpawnResult } from '@expo/spawn-async';
declare function saveUrlToPathAsync(url: string, path: string, timeout?: number): Promise<unknown>;
declare function getManifestAsync(url: string, headers: any, options?: any): Promise<any>;
export declare type AsyncSpawnOptions = SpawnOptions & {
    loggerFields?: any;
    pipeToLogger?: boolean | {
        stdout?: boolean;
        stderr?: boolean;
    };
    stdoutOnly?: boolean;
    loggerLineTransformer?: (line: any) => any;
};
declare function spawnAsyncThrowError(command: string, args: string[], options?: AsyncSpawnOptions): Promise<SpawnResult>;
declare function spawnAsync(command: string, args: string[], options: SpawnOptions): Promise<SpawnResult | void>;
declare function isDirectory(dir: string): boolean;
declare type LocaleMap = {
    [lang: string]: any;
};
declare function getResolvedLocalesAsync(projectRoot: string, exp: ExpoConfig): Promise<LocaleMap>;
declare function regexFileAsync(regex: RegExp | string, replace: string, filename: string): Promise<void>;
declare function deleteLinesInFileAsync(startRegex: RegExp | string, endRegex: RegExp | string, filename: string): Promise<void>;
export { isDirectory, saveUrlToPathAsync, getManifestAsync, spawnAsyncThrowError, spawnAsync, getResolvedLocalesAsync, regexFileAsync, deleteLinesInFileAsync, };
