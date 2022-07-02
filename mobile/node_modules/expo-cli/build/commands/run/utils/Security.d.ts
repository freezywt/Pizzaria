import forge from 'node-forge';
export declare type CertificateSigningInfo = {
    /**
     * @example 'AA00AABB0A'
     */
    signingCertificateId: string;
    /**
     * @example 'Apple Development: Evan Bacon (AA00AABB0A)'
     */
    codeSigningInfo?: string;
    /**
     * @example '650 Industries, Inc.'
     */
    appleTeamName?: string;
    /**
     * @example 'A1BCDEF234'
     */
    appleTeamId?: string;
};
export declare function assertInstalledAsync(): Promise<void>;
export declare function getCertificateForSigningIdAsync(id: string): Promise<forge.pki.Certificate>;
export declare function findIdentitiesAsync(): Promise<string[]>;
/**
 * @param value '  2) 12312234253761286351826735HGKDHAJGF45283 "Apple Development: bacon@expo.io (BB00AABB0A)"'
 * @returns 'Apple Development: Evan Bacon (PH75MDXG4H)'
 */
export declare function extractCodeSigningInfo(value: string): string | null;
export declare function resolveIdentitiesAsync(identities: string[]): Promise<CertificateSigningInfo[]>;
export declare function resolveCertificateSigningInfoAsync(signingCertificateId: string): Promise<CertificateSigningInfo>;
/**
 * @param codeSigningInfo 'Apple Development: Evan Bacon (AA00AABB0A)'
 * @returns 'AA00AABB0A'
 */
export declare function extractSigningId(codeSigningInfo: string): string | null;
