import { AppleCtx } from './authenticate';
export interface EnsureAppExistsOptions {
    enablePushNotifications?: boolean;
}
export interface AppLookupParams {
    accountName: string;
    projectName: string;
    bundleIdentifier: string;
}
export declare function ensureBundleIdExistsAsync(authCtx: AppleCtx, { accountName, projectName, bundleIdentifier }: AppLookupParams, options?: EnsureAppExistsOptions): Promise<void>;
export declare function ensureBundleIdExistsWithNameAsync(authCtx: AppleCtx, { name, bundleIdentifier }: {
    name: string;
    bundleIdentifier: string;
}, options?: EnsureAppExistsOptions): Promise<void>;
