import { Canceler } from 'axios';
declare type ProgressCallback = (progressPercentage: number) => void;
declare type RetryCallback = (cancel: Canceler) => void;
export declare function downloadAppAsync(url: string, outputPath: string, { extract }?: {
    extract?: boolean | undefined;
}, progressFunction?: ProgressCallback, retryFunction?: RetryCallback): Promise<void>;
export {};
