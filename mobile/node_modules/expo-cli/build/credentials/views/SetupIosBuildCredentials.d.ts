import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
export declare class SetupIosBuildCredentials implements IView {
    private app;
    constructor(app: AppLookupParams);
    open(ctx: Context): Promise<IView | null>;
    bestEffortAppleCtx(ctx: Context): Promise<void>;
}
export declare class SetupIosBuildCredentialsFromLocal implements IView {
    private app;
    constructor(app: AppLookupParams);
    open(ctx: Context): Promise<IView | null>;
}
