/// <reference types="node" />
import type * as net from 'net';
import { LockdownProtocolClient } from '../protocol/lockdown';
import { ServiceClient } from './client';
import type { UsbmuxdPairRecord } from './usbmuxd';
export interface DeviceValues {
    BasebandCertId: number;
    BasebandKeyHashInformation: {
        AKeyStatus: number;
        SKeyHash: Buffer;
        SKeyStatus: number;
    };
    BasebandSerialNumber: Buffer;
    BasebandVersion: string;
    BoardId: number;
    BuildVersion: string;
    ChipID: number;
    DeviceClass: string;
    DeviceColor: string;
    DeviceName: string;
    DieID: number;
    HardwareModel: string;
    HasSiDP: boolean;
    PartitionType: string;
    ProductName: string;
    ProductType: string;
    ProductVersion: string;
    ProductionSOC: boolean;
    ProtocolVersion: string;
    TelephonyCapability: boolean;
    UniqueChipID: number;
    UniqueDeviceID: string;
    WiFiAddress: string;
    [key: string]: any;
}
export declare class LockdowndClient extends ServiceClient<LockdownProtocolClient> {
    socket: net.Socket;
    constructor(socket: net.Socket);
    startService(name: string): Promise<{
        port: number;
        enableServiceSSL: boolean;
    }>;
    startSession(pairRecord: UsbmuxdPairRecord): Promise<void>;
    getAllValues(): Promise<DeviceValues>;
    getValue(val: string): Promise<string>;
    queryType(): Promise<string>;
    doHandshake(pairRecord: UsbmuxdPairRecord): Promise<void>;
}
