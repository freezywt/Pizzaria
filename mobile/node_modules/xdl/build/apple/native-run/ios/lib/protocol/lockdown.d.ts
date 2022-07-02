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
export declare const LOCKDOWN_HEADER_SIZE = 4;
export interface LockdownCommand {
    Command: string;
    [key: string]: any;
}
export interface LockdownResponse {
    Status: string;
    [key: string]: any;
}
export interface LockdownErrorResponse {
    Error: string;
    Request?: string;
    Service?: string;
}
export interface LockdownRequest {
    Request: string;
    [key: string]: any;
}
export declare function isLockdownResponse(resp: any): resp is LockdownResponse;
export declare function isLockdownErrorResponse(resp: any): resp is LockdownErrorResponse;
export declare class LockdownProtocolClient<MessageType extends LockdownRequest | LockdownCommand = LockdownRequest> extends ProtocolClient<MessageType> {
    constructor(socket: net.Socket);
}
export declare class LockdownProtocolReader extends PlistProtocolReader {
    constructor(callback: (data: any) => any);
    parseHeader(data: Buffer): number;
    parseBody(data: Buffer): any;
}
export declare class LockdownProtocolWriter implements ProtocolWriter {
    write(socket: net.Socket, plistData: any): void;
}
