/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
/**
 * Type union of error codes we get back from the protocol.
 */
export declare type IOSLibErrorCode = 'DeviceLocked';
export declare class IOSLibError extends Error implements NodeJS.ErrnoException {
    readonly code: IOSLibErrorCode;
    constructor(message: string, code: IOSLibErrorCode);
}
