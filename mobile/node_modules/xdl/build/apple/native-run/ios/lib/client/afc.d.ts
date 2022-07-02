/// <reference types="node" />
import type * as net from 'net';
import { AFCProtocolClient } from '../protocol/afc';
import type { AFCResponse } from '../protocol/afc';
import { ServiceClient } from './client';
export declare class AFCClient extends ServiceClient<AFCProtocolClient> {
    socket: net.Socket;
    constructor(socket: net.Socket);
    getFileInfo(path: string): Promise<string[]>;
    writeFile(fd: Buffer, data: Buffer): Promise<AFCResponse>;
    openFile(path: string): Promise<Buffer>;
    closeFile(fd: Buffer): Promise<AFCResponse>;
    uploadFile(srcPath: string, destPath: string): Promise<void>;
    makeDirectory(path: string): Promise<AFCResponse>;
    uploadDirectory(srcPath: string, destPath: string): Promise<void>;
}
