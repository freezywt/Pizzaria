/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import type * as net from 'net';
import type { ProtocolWriter } from './protocol';
import { PlistProtocolReader, ProtocolClient } from './protocol';
export declare const USBMUXD_HEADER_SIZE = 16;
export interface UsbmuxMessage {
    messageType: string;
    extraFields?: {
        [key: string]: any;
    };
}
export declare class UsbmuxProtocolClient extends ProtocolClient<UsbmuxMessage> {
    constructor(socket: net.Socket);
}
export declare class UsbmuxProtocolReader extends PlistProtocolReader {
    constructor(callback: (data: any) => any);
    parseHeader(data: Buffer): number;
    parseBody(data: Buffer): any;
}
export declare class UsbmuxProtocolWriter implements ProtocolWriter {
    private useTag;
    write(socket: net.Socket, msg: UsbmuxMessage): void;
}
