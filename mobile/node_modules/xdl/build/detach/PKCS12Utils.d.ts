/// <reference types="node" />
import forge from 'node-forge';
export declare function getP12CertFingerprint(p12Buffer: Buffer | string, passwordRaw: string | null): string;
export declare function findP12CertSerialNumber(p12Buffer: Buffer | string, passwordRaw: string | null): string | null;
export declare function getCertData(p12Buffer: Buffer | string, passwordRaw: string | null): {
    serialNumber: string | null;
    version: number;
    signature: any;
    siginfo: any;
    validity: {
        notBefore: Date;
        notAfter: Date;
    };
    issuer: {
        getField(sn: string | forge.pki.CertificateFieldOptions): any;
        addField(attr: forge.pki.CertificateField): void;
        attributes: any[];
        hash: any;
    };
    subject: {
        getField(sn: string | forge.pki.CertificateFieldOptions): any;
        addField(attr: forge.pki.CertificateField): void;
        attributes: any[];
        hash: any;
    };
    extensions: any[];
    privateKey: forge.pki.PrivateKey;
    publicKey: forge.pki.PublicKey;
    md: any;
    setSubject(attrs: forge.pki.CertificateField[], uniqueId?: string | undefined): void;
    setIssuer(attrs: forge.pki.CertificateField[], uniqueId?: string | undefined): void;
    setExtensions(exts: any[]): void;
    getExtension(options: string | {
        name: string;
    } | {
        id: number;
    }): {} | undefined;
    sign(key: forge.pki.PrivateKey, md?: forge.md.MessageDigest | undefined): void;
    verify(child: forge.pki.Certificate): boolean;
    getAttribute(opts: string | forge.pki.GetAttributeOpts): forge.pki.Attribute | null;
    isIssuer(parent: forge.pki.Certificate): boolean;
    issued(child: forge.pki.Certificate): boolean;
};
