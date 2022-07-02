declare function checkForUpdateAsync(): Promise<{
    updateIsAvailable: boolean;
    latest: string;
    current: string;
    deprecated: unknown;
}>;
declare const _default: {
    checkForUpdateAsync: typeof checkForUpdateAsync;
};
export default _default;
