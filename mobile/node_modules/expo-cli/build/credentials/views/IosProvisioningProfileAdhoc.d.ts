import { ProvisioningProfile } from '../../appleApi';
import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
export declare type ProvisioningProfileAdhocOptions = {
    distCertSerialNumber: string;
    udids: string[];
};
export declare class CreateOrReuseProvisioningProfileAdhoc implements IView {
    private app;
    private distCertSerialNumber;
    private udids;
    constructor(app: AppLookupParams, options: ProvisioningProfileAdhocOptions);
    assignProvisioningProfile(ctx: Context, provisioningProfile: ProvisioningProfile): Promise<void>;
    createOrReuse(ctx: Context): Promise<ProvisioningProfile>;
    open(ctx: Context): Promise<IView | null>;
}
