/// <reference types="node" />
import * as net from 'net';
import { UsbmuxProtocolClient } from '../protocol/usbmux';
import { ServiceClient } from './client';
export interface UsbmuxdDeviceProperties {
    ConnectionSpeed: number;
    ConnectionType: 'USB';
    DeviceID: number;
    LocationID: number;
    ProductID: number;
    SerialNumber: string;
}
export interface UsbmuxdDevice {
    DeviceID: number;
    MessageType: 'Attached';
    Properties: UsbmuxdDeviceProperties;
}
export interface UsbmuxdConnectResponse {
    MessageType: 'Result';
    Number: number;
}
export interface UsbmuxdDeviceResponse {
    DeviceList: UsbmuxdDevice[];
}
export interface UsbmuxdPairRecordResponse {
    PairRecordData: Buffer;
}
export interface UsbmuxdPairRecord {
    DeviceCertificate: Buffer;
    EscrowBag: Buffer;
    HostCertificate: Buffer;
    HostID: string;
    HostPrivateKey: Buffer;
    RootCertificate: Buffer;
    RootPrivateKey: Buffer;
    SystemBUID: string;
    WiFiMACAddress: string;
}
export declare class UsbmuxdClient extends ServiceClient<UsbmuxProtocolClient> {
    socket: net.Socket;
    constructor(socket: net.Socket);
    static connectUsbmuxdSocket(): net.Socket;
    connect(device: UsbmuxdDevice, port: number): Promise<net.Socket>;
    getDevices(): Promise<UsbmuxdDevice[]>;
    getDevice(udid?: string): Promise<UsbmuxdDevice>;
    readPairRecord(udid: string): Promise<UsbmuxdPairRecord>;
}
