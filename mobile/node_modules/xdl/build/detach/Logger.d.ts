/// <reference types="expo__bunyan" />
/// <reference types="node" />
import bunyan from '@expo/bunyan';
import { Readable } from 'stream';
export declare enum LogLevel {
    trace = "trace",
    debug = "debug",
    info = "info",
    warn = "warn",
    error = "error",
    fatal = "fatal"
}
declare type BunyanGetter = () => bunyan;
export declare class Logger {
    loggerObj: bunyan;
    loggerGetter?: BunyanGetter;
    extraFields: any;
    constructor(bunyanGetter?: BunyanGetter, extraFields?: any);
    configure(loggerObj: bunyan): void;
    withFields(extraFields: any): Logger;
    trace(...all: any[]): void;
    debug(...all: any[]): void;
    info(...all: any[]): void;
    warn(...all: any[]): void;
    error(...all: any[]): void;
    fatal(...all: any[]): void;
    logLine(level: LogLevel, ...args: any[]): void;
}
declare const LoggerDetach: Logger;
export default LoggerDetach;
export declare function pipeOutputToLogger({ stdout, stderr }?: {
    stdout?: Readable | null;
    stderr?: Readable | null;
}, extraFields?: {}, { stdoutOnly, loggerLineTransformer, }?: {
    stdoutOnly?: boolean;
    loggerLineTransformer?: (line: any) => any;
}): void;
