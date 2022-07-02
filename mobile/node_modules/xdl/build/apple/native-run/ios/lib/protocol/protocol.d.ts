/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import type * as net from 'net';
export declare type ProtocolReaderCallback = (resp: any, err?: Error) => void;
export declare class ProtocolReaderFactory<T> {
    private ProtocolReader;
    constructor(ProtocolReader: new (callback: ProtocolReaderCallback) => T);
    create(callback: (resp: any, err?: Error) => void): T;
}
export declare abstract class ProtocolReader {
    protected headerSize: number;
    protected callback: ProtocolReaderCallback;
    protected body: Buffer;
    protected bodyLength: number;
    protected buffer: Buffer;
    constructor(headerSize: number, callback: ProtocolReaderCallback);
    /** Returns length of body, or -1 if header doesn't contain length */
    protected abstract parseHeader(data: Buffer): number;
    protected abstract parseBody(data: Buffer): any;
    onData(data?: Buffer): void;
}
export declare abstract class PlistProtocolReader extends ProtocolReader {
    protected parseBody(body: Buffer): any;
}
export interface ProtocolWriter {
    write(sock: net.Socket, msg: any): void;
}
export declare abstract class ProtocolClient<MessageType = any> {
    socket: net.Socket;
    protected readerFactory: ProtocolReaderFactory<ProtocolReader>;
    protected writer: ProtocolWriter;
    constructor(socket: net.Socket, readerFactory: ProtocolReaderFactory<ProtocolReader>, writer: ProtocolWriter);
    sendMessage<ResponseType = any>(msg: MessageType): Promise<ResponseType>;
    sendMessage<CallbackType = void, ResponseType = any>(msg: MessageType, callback: (response: ResponseType, resolve: any, reject: any) => void): Promise<CallbackType>;
}
