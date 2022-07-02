/// <reference types="node" />
import type * as net from 'net';
import { GDBProtocolClient } from '../protocol/gdb';
import { ServiceClient } from './client';
export declare class DebugserverClient extends ServiceClient<GDBProtocolClient> {
    socket: net.Socket;
    constructor(socket: net.Socket);
    setMaxPacketSize(size: number): Promise<any>;
    setWorkingDir(workingDir: string): Promise<any>;
    checkLaunchSuccess(): Promise<any>;
    attachByName(name: string): Promise<any>;
    continue(): Promise<any>;
    halt(): boolean;
    kill(): Promise<void>;
    launchApp(appPath: string, executableName: string): Promise<any>;
    sendCommand(cmd: string, args: string[]): Promise<any>;
}
