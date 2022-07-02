/// <reference types="expo__bunyan" />
import bunyan from '@expo/bunyan';
export declare type LogStream = bunyan.Stream;
export declare type Log = bunyan;
declare const _default: {
    child: (options: object) => bunyan;
    notifications: bunyan;
    global: bunyan;
    DEBUG: number;
    INFO: number;
    WARN: number;
    ERROR: number;
};
export default _default;
