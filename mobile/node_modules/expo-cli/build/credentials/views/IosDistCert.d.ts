import { DistCert } from '../../appleApi';
import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
import { IosDistCredentials } from '../credentials';
export declare class CreateIosDist implements IView {
    private accountName;
    constructor(accountName: string);
    create(ctx: Context): Promise<IosDistCredentials>;
    open(ctx: Context): Promise<IView | null>;
    provideOrGenerate(ctx: Context): Promise<DistCert>;
}
export declare class RemoveIosDist implements IView {
    private accountName;
    private shouldRevoke;
    constructor(accountName: string, shouldRevoke?: boolean);
    open(ctx: Context): Promise<IView | null>;
    removeSpecific(ctx: Context, selected: IosDistCredentials): Promise<void>;
}
export declare class UpdateIosDist implements IView {
    private accountName;
    constructor(accountName: string);
    open(ctx: Context): Promise<IView | null>;
    updateSpecific(ctx: Context, selected: IosDistCredentials): Promise<void>;
    provideOrGenerate(ctx: Context): Promise<DistCert>;
}
export declare class UseExistingDistributionCert implements IView {
    private app;
    constructor(app: AppLookupParams);
    open(ctx: Context): Promise<IView | null>;
}
export declare class CreateOrReuseDistributionCert implements IView {
    private app;
    constructor(app: AppLookupParams);
    assignDistCert(ctx: Context, userCredentialsId: number): Promise<void>;
    open(ctx: Context): Promise<IView | null>;
    _createOrReuse(ctx: Context): Promise<IView | null>;
}
export declare function validateDistributionCertificate(ctx: Context, distributionCert: DistCert): Promise<boolean>;
export declare function getDistCertFromParams(builderOptions: {
    distP12Path?: string;
    teamId?: string;
}): Promise<DistCert | null>;
export declare function useDistCertFromParams(ctx: Context, app: AppLookupParams, distCert: DistCert): Promise<IosDistCredentials>;
