/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { Certificate, RequestContext } from '@expo/apple-utils';
import CommandError from '../CommandError';
import { AppleCtx } from './authenticate';
export declare type DistCertInfo = {
    id: string;
    name: string;
    status: string;
    created: number;
    expires: number;
    ownerName: string;
    ownerId: string;
    serialNumber: string;
};
export declare type DistCert = {
    certId?: string;
    certP12: string;
    certPassword: string;
    certPrivateSigningKey?: string;
    distCertSerialNumber?: string;
    teamId: string;
    teamName?: string;
};
export declare class AppleTooManyCertsError extends CommandError {
}
export declare function getCertificateBySerialNumberAsync(context: RequestContext, serialNumber: string): Promise<Certificate>;
export declare function getDistributionCertificateAync(context: RequestContext, serialNumber: string): Promise<Certificate | null>;
export declare function transformCertificate(cert: Certificate): DistCertInfo;
export declare function listDistributionCertificatesAsync(authCtx: AppleCtx): Promise<DistCertInfo[]>;
/**
 * Run from `eas credentials` -> iOS -> Add new Distribution Certificate
 */
export declare function createDistributionCertificateAsync(authCtx: AppleCtx): Promise<DistCert>;
export declare function revokeDistributionCertificateAsync(authCtx: AppleCtx, ids: string[]): Promise<void>;
export declare function isDistCert(obj: {
    [key: string]: any;
}): obj is DistCert;
export declare class DistCertManager {
    ctx: AppleCtx;
    constructor(ctx: AppleCtx);
    list(): Promise<DistCertInfo[]>;
    create(): Promise<DistCert>;
    revoke(ids: string[]): Promise<void>;
    format({ name, id, status, expires, created, ownerName }: DistCertInfo): string;
}
