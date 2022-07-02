/**
 * Copyright (c) 2021 Expo, Inc.
 * Copyright (c) 2018 Drifty Co.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { AFCClient } from './client/afc';
import { DebugserverClient } from './client/debugserver';
import { InstallationProxyClient } from './client/installation_proxy';
import { LockdowndClient } from './client/lockdownd';
import { MobileImageMounterClient } from './client/mobile_image_mounter';
import type { UsbmuxdDevice, UsbmuxdPairRecord } from './client/usbmuxd';
import { UsbmuxdClient } from './client/usbmuxd';
export declare class ClientManager {
    pairRecord: UsbmuxdPairRecord;
    device: UsbmuxdDevice;
    private lockdowndClient;
    private connections;
    constructor(pairRecord: UsbmuxdPairRecord, device: UsbmuxdDevice, lockdowndClient: LockdowndClient);
    static create(udid?: string): Promise<ClientManager>;
    getUsbmuxdClient(): Promise<UsbmuxdClient>;
    getLockdowndClient(): Promise<LockdowndClient>;
    getLockdowndClientWithHandshake(): Promise<LockdowndClient>;
    getAFCClient(): Promise<AFCClient>;
    getInstallationProxyClient(): Promise<InstallationProxyClient>;
    getMobileImageMounterClient(): Promise<MobileImageMounterClient>;
    getDebugserverClient(): Promise<DebugserverClient>;
    private getServiceClient;
    end(): void;
}
