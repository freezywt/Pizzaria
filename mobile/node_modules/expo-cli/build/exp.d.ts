import { Command } from 'commander';
export declare const helpGroupOrder: string[];
export declare type Action = (...args: any[]) => void;
export declare function bootstrapAnalyticsAsync(): Promise<void>;
export declare function trackUsage(commands?: Command[]): void;
export declare function run(programName: string): void;
