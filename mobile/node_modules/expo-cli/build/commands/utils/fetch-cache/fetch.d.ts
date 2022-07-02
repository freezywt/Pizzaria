import { RequestInfo, RequestInit, Response } from 'node-fetch';
declare function createFetchWithCache(cache: import('./FileSystemCache').FileSystemCache): (url: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;
export default createFetchWithCache;
