declare class Cacher<T> {
    refresher: () => Promise<T>;
    filename: string;
    bootstrapFile?: string;
    ttlMilliseconds: number;
    readError?: any;
    writeError?: any;
    constructor(refresher: () => Promise<T>, filename: string, ttlMilliseconds?: number, bootstrapFile?: string);
    getAsync(): Promise<T>;
    clearAsync(): Promise<void>;
}
declare function getCacheDir(): string;
export { Cacher, getCacheDir };
