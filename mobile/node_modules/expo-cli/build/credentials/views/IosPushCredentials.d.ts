import { PushKey } from '../../appleApi';
import { CredentialSchema } from '../actions/promptForCredentials';
import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
import { IosPushCredentials } from '../credentials';
export declare class CreateIosPush implements IView {
    private accountName;
    constructor(accountName: string);
    create(ctx: Context): Promise<IosPushCredentials>;
    open(ctx: Context): Promise<IView | null>;
    _getRequiredQuestions(ctx: Context): CredentialSchema<PushKey>;
    _ensurePushKey(ctx: Context, partialKey: Partial<PushKey>): PushKey;
    provideOrGenerate(ctx: Context): Promise<PushKey>;
}
export declare class CreateAndAssignIosPush extends CreateIosPush {
    open(ctx: Context): Promise<IView | null>;
    assignToCurrentProject(ctx: Context, pushKeyId: number): Promise<void>;
}
export declare class RemoveIosPush implements IView {
    private accountName;
    private shouldRevoke;
    constructor(accountName: string, shouldRevoke?: boolean);
    open(ctx: Context): Promise<IView | null>;
    removePushCert(ctx: Context, app: AppLookupParams): Promise<void>;
    removeSpecific(ctx: Context, selected: IosPushCredentials): Promise<void>;
}
export declare class UpdateIosPush implements IView {
    private accountName;
    constructor(accountName: string);
    open(ctx: Context): Promise<null>;
    updateSpecific(ctx: Context, selected: IosPushCredentials): Promise<void>;
    provideOrGenerate(ctx: Context): Promise<PushKey>;
}
export declare class UseExistingPushNotification implements IView {
    private app;
    constructor(app: AppLookupParams);
    open(ctx: Context): Promise<IView | null>;
}
export declare class CreateOrReusePushKey implements IView {
    private app;
    constructor(app: AppLookupParams);
    assignPushKey(ctx: Context, userCredentialsId: number): Promise<void>;
    open(ctx: Context): Promise<IView | null>;
    _createOrReuse(ctx: Context): Promise<IView | null>;
}
export declare function validatePushKey(ctx: Context, pushKey: PushKey): Promise<boolean>;
export declare function getPushKeyFromParams(builderOptions: {
    pushId?: string;
    pushP8Path?: string;
    teamId?: string;
}): Promise<PushKey | null>;
export declare function usePushKeyFromParams(ctx: Context, app: AppLookupParams, pushKey: PushKey): Promise<IosPushCredentials>;
