/// <reference types="node" />
import type * as net from 'net';
import type { LockdownCommand } from '../protocol/lockdown';
import { LockdownProtocolClient } from '../protocol/lockdown';
import { ServiceClient } from './client';
export declare type OnInstallProgressCallback = (props: {
    status: string;
    isComplete: boolean;
    progress: number;
}) => void;
interface IPOptions {
    ApplicationsType?: 'Any';
    PackageType?: 'Developer';
    CFBundleIdentifier?: string;
    ReturnAttributes?: ('CFBundleIdentifier' | 'CFBundleExecutable' | 'Container' | 'Path')[];
    BundleIDs?: string[];
    [key: string]: undefined | string | string[];
}
interface IPMessage extends LockdownCommand {
    Command: string;
    ClientOptions: IPOptions;
}
export interface IPLookupResult {
    [key: string]: {
        Container: string;
        CFBundleIdentifier: string;
        CFBundleExecutable: string;
        Path: string;
    };
}
export declare class InstallationProxyClient extends ServiceClient<LockdownProtocolClient<IPMessage>> {
    socket: net.Socket;
    constructor(socket: net.Socket);
    lookupApp(bundleIds: string[], options?: IPOptions): Promise<IPLookupResult>;
    installApp(packagePath: string, bundleId: string, options: IPOptions | undefined, onProgress: OnInstallProgressCallback): Promise<void>;
}
export {};
