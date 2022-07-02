/**
 * Wrap a method and profile the time it takes to execute the method using `EXPO_PROFILE`.
 * Works best with named functions (i.e. not arrow functions).
 *
 * @param fn
 * @param functionName
 */
export declare const profileMethod: <T extends any[], U>(fn: (...args: T) => U, functionName?: string | undefined) => (...args: T) => U;
