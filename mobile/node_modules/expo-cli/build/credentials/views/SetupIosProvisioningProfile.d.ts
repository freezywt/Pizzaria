import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
export declare class SetupIosProvisioningProfile implements IView {
    private app;
    constructor(app: AppLookupParams);
    open(ctx: Context): Promise<IView | null>;
}
