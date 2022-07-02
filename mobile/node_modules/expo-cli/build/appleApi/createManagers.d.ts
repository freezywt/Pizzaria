import { AppleCtx } from './authenticate';
import { DistCertManager } from './distributionCert';
import { ProvisioningProfileManager } from './provisioningProfile';
import { PushKeyManager } from './pushKey';
export declare const createManagers: (ctx: AppleCtx) => {
    distributionCert: DistCertManager;
    pushKey: PushKeyManager;
    provisioningProfile: ProvisioningProfileManager;
};
