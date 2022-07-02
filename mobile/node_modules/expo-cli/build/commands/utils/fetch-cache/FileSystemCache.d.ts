/// <reference types="node" />
import cacache from 'cacache';
import { Readable } from 'stream';
export declare class FileSystemCache {
    options: {
        ttl?: boolean;
        cacheDirectory: string;
    };
    constructor(options: {
        ttl?: boolean;
        cacheDirectory: string;
    });
    get(key: string): Promise<{
        bodyStream: Readable | NodeJS.ReadableStream;
        metaData: any;
    } | undefined>;
    remove(key: string): Promise<[cacache.CacheObject, cacache.CacheObject]>;
    set(key: string, bodyStream: NodeJS.ReadStream, metaData: any): Promise<{
        bodyStream: Readable | NodeJS.ReadableStream;
        metaData: any;
    } | undefined>;
}
