/// <reference types="node" />
import type * as net from 'net';
import type { ProtocolReaderCallback, ProtocolWriter } from './protocol';
import { ProtocolClient, ProtocolReader } from './protocol';
export interface GDBMessage {
    cmd: string;
    args: string[];
}
export declare class GDBProtocolClient extends ProtocolClient<GDBMessage> {
    constructor(socket: net.Socket);
}
export declare class GDBProtocolReader extends ProtocolReader {
    constructor(callback: ProtocolReaderCallback);
    onData(data?: Buffer): void;
    parseHeader(data: Buffer): number;
    parseBody(buffer: Buffer): string;
}
export declare class GDBProtocolWriter implements ProtocolWriter {
    write(socket: net.Socket, msg: GDBMessage): void;
}
