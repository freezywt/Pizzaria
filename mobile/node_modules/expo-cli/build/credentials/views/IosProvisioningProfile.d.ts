import { AppleCtx, DistCert, ProvisioningProfile, ProvisioningProfileInfo } from '../../appleApi';
import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
import { IosDistCredentials } from '../credentials';
export declare class RemoveProvisioningProfile implements IView {
    private accountName;
    private shouldRevoke;
    constructor(accountName: string, shouldRevoke?: boolean);
    open(ctx: Context): Promise<IView | null>;
    removeSpecific(ctx: Context, app: AppLookupParams): Promise<void>;
}
export declare class CreateProvisioningProfile implements IView {
    private app;
    constructor(app: AppLookupParams);
    create(ctx: Context): Promise<ProvisioningProfile>;
    open(ctx: Context): Promise<IView | null>;
    provideOrGenerate(ctx: Context): Promise<ProvisioningProfile>;
}
export declare class UseExistingProvisioningProfile implements IView {
    private app;
    constructor(app: AppLookupParams);
    open(ctx: Context): Promise<IView | null>;
}
export declare class CreateOrReuseProvisioningProfile implements IView {
    private app;
    constructor(app: AppLookupParams);
    choosePreferred(profiles: ProvisioningProfileInfo[], distCert: IosDistCredentials): ProvisioningProfileInfo;
    open(ctx: Context): Promise<IView | null>;
    _createOrReuse(ctx: Context): Promise<IView | null>;
}
export declare function validateProfileWithoutApple(provisioningProfile: ProvisioningProfile, distCert: DistCert, bundleIdentifier: string): Promise<boolean>;
export declare function getAppleInfo(appleCtx: AppleCtx, bundleIdentifier: string, profile: ProvisioningProfile): Promise<ProvisioningProfileInfo | null>;
export declare function configureAndUpdateProvisioningProfile(ctx: Context, app: AppLookupParams, distCert: DistCert, profileFromApple: ProvisioningProfileInfo): Promise<void>;
export declare function getProvisioningProfileFromParams(provisioningProfilePath?: string): Promise<ProvisioningProfile | null>;
export declare function useProvisioningProfileFromParams(ctx: Context, app: AppLookupParams, provisioningProfile: ProvisioningProfile): Promise<ProvisioningProfile>;
