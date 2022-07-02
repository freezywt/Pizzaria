/// <reference types="node" />
import type * as net from 'net';
import type { LockdownCommand, LockdownResponse } from '../protocol/lockdown';
import { LockdownProtocolClient } from '../protocol/lockdown';
import { ServiceClient } from './client';
export declare type MIMMountResponse = LockdownResponse;
export interface MIMMessage extends LockdownCommand {
    ImageType: string;
}
export interface MIMLookupResponse extends LockdownResponse {
    ImageSignature?: string;
}
export interface MIMUploadCompleteResponse extends LockdownResponse {
    Status: 'Complete';
}
export interface MIMUploadReceiveBytesResponse extends LockdownResponse {
    Status: 'ReceiveBytesAck';
}
export declare class MobileImageMounterClient extends ServiceClient<LockdownProtocolClient<MIMMessage>> {
    constructor(socket: net.Socket);
    mountImage(imagePath: string, imageSig: Buffer): Promise<void>;
    uploadImage(imagePath: string, imageSig: Buffer): Promise<void>;
    lookupImage(): Promise<MIMLookupResponse>;
}
