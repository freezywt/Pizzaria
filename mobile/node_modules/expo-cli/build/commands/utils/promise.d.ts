/**
 * Returns a promise that will be resolved after given ms milliseconds.
 *
 * @param ms A number of milliseconds to sleep.
 * @returns A promise that resolves after the provided number of milliseconds.
 */
declare function sleep(ms: number): Promise<void>;
export { sleep };
