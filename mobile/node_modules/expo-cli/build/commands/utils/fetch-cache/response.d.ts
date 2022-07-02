import { CacheObject } from 'cacache';
import { BodyInit, Response, ResponseInit } from 'node-fetch';
export declare class NFCResponse extends Response {
    ejectFromCache: () => Promise<[CacheObject, CacheObject]>;
    fromCache: boolean;
    constructor(bodyStream?: BodyInit, metaData?: ResponseInit, ejectFromCache?: () => Promise<[CacheObject, CacheObject]>, fromCache?: boolean);
    static serializeMetaFromNodeFetchResponse(res: Response): {
        url: string;
        status: number;
        statusText: string;
        headers: {
            [k: string]: string[];
        };
        size: number;
        timeout: number;
        counter: any;
    };
}
