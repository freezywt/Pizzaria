/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/// <reference types="node" />
import * as cp from 'child_process';
export declare function once<T extends (...args: any[]) => any>(fn: T): T;
export declare const exec: typeof cp.exec.__promisify__;
export declare const execFile: typeof cp.execFile.__promisify__;
export declare const wait: typeof setTimeout.__promisify__;
export declare type ExitQueueFn = () => Promise<void>;
export declare function onBeforeExit(fn: ExitQueueFn): void;
