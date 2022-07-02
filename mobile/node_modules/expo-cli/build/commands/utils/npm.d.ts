/// <reference types="node" />
import { JSONValue } from '@expo/json-file';
export declare function sanitizeNpmPackageName(name: string): string;
export declare function npmPackAsync(packageName: string, cwd?: string | undefined, ...props: string[]): Promise<JSONValue>;
export declare function downloadAndExtractNpmModuleAsync(npmName: string, props: ExtractProps): Promise<void>;
export declare function extractLocalNpmTarballAsync(tarFilePath: string, props: ExtractProps): Promise<void>;
declare type ExtractProps = {
    name: string;
    cwd: string;
    strip?: number;
    fileList?: string[];
};
export declare function extractNpmTarballFromUrlAsync(url: string, props: ExtractProps): Promise<void>;
export declare function extractNpmTarballAsync(stream: NodeJS.ReadableStream, props: ExtractProps): Promise<void>;
export {};
