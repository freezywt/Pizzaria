/// <reference types="node" />
import { pki } from 'node-forge';
export declare function getP12CertFingerprint(p12Buffer: Buffer | string, passwordRaw: string | null): string;
export declare function findP12CertSerialNumber(p12Buffer: Buffer | string, passwordRaw: string | null): string;
export declare function getCertData(p12Buffer: Buffer | string, passwordRaw: string | null): pki.Certificate;
