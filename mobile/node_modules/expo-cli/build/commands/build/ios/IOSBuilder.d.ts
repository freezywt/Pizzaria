import { Context } from '../../../credentials/context';
import BaseBuilder from '../BaseBuilder';
interface AppLookupParams {
    accountName: string;
    projectName: string;
    bundleIdentifier: string;
}
declare class IOSBuilder extends BaseBuilder {
    run(): Promise<void>;
    bestEffortAppleCtx(ctx: Context): Promise<void>;
    checkProjectConfig(): Promise<void>;
    private getAccountNameAsync;
    private prepareCredentials;
    _setupDistCert(ctx: Context, appLookupParams: AppLookupParams): Promise<void>;
    _setupPushCert(ctx: Context, appLookupParams: AppLookupParams): Promise<void>;
    _setupProvisioningProfile(ctx: Context, appLookupParams: AppLookupParams): Promise<void>;
    produceCredentials(ctx: Context, appLookupParams: AppLookupParams): Promise<void>;
    clearAndRevokeCredentialsIfRequested(ctx: Context, appLookupParams: AppLookupParams): Promise<void>;
    clearCredentials(ctx: Context, appLookupParams: AppLookupParams, credsToClear: Record<string, boolean>): Promise<void>;
    determineCredentialsToClear(): Record<string, boolean>;
    ensureProjectIsPublished(): Promise<string[] | undefined>;
    platform(): "ios";
    validateIcon(): Promise<void>;
    maybeExplainUploadStep(): void;
    maybeWarnDamagedSimulator(): void;
}
export default IOSBuilder;
