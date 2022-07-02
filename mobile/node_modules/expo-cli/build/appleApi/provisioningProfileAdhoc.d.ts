import { AppleCtx } from './authenticate';
import { ProvisioningProfile } from './provisioningProfile';
export declare class ProvisioningProfileAdhocManager {
    ctx: AppleCtx;
    constructor(ctx: AppleCtx);
    createOrReuse(udids: string[], bundleIdentifier: string, distCertSerialNumber: string): Promise<ProvisioningProfile>;
}
