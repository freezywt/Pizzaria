/// <reference types="node" />
import { EventEmitter } from 'events';
interface BundleBuildFinishEvent {
    totalBuildTimeMs: number;
}
interface DeviceLogReceiveEvent {
    deviceId: string;
    deviceName: string;
}
interface StatusEvents {
    bundleBuildFinish: BundleBuildFinishEvent;
    deviceLogReceive: DeviceLogReceiveEvent;
}
declare type StatusEventKey = keyof StatusEvents;
declare interface StatusEventEmitter {
    addListener<K extends StatusEventKey>(event: K, listener: (fields: StatusEvents[K]) => void): this;
    once<K extends StatusEventKey>(event: K, listener: (fields: StatusEvents[K]) => void): this;
    removeListener<K extends StatusEventKey>(event: K, listener: (fields: StatusEvents[K]) => void): this;
    emit<K extends StatusEventKey>(event: K, fields: StatusEvents[K]): boolean;
}
declare class StatusEventEmitter extends EventEmitter {
}
declare const _default: StatusEventEmitter;
export default _default;
