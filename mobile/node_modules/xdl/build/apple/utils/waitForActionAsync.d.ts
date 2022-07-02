export declare class TimeoutError extends Error {
}
export declare function waitForActionAsync<T>({ action, interval, maxWaitTime, }: {
    action: () => T | Promise<T>;
    interval?: number;
    maxWaitTime?: number;
}): Promise<T>;
