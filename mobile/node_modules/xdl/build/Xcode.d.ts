export declare const minimumVersion = 9.4;
export declare const appStoreId = "497799835";
export declare function getXcodeVersion(): string | null;
/**
 * Open a link to the App Store. Just link in mobile apps, **never** redirect without prompting first.
 *
 * @param appId
 */
export declare function openAppStore(appId: string): void;
