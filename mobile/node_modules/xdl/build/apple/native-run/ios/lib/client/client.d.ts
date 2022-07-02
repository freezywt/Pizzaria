/// <reference types="node" />
/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type * as net from 'net';
import type { ProtocolClient } from '../protocol';
export declare abstract class ServiceClient<T extends ProtocolClient> {
    socket: net.Socket;
    protected protocolClient: T;
    constructor(socket: net.Socket, protocolClient: T);
}
export declare class ResponseError extends Error {
    response: any;
    constructor(msg: string, response: any);
}
