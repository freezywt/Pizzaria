import { AppleCtx } from './authenticate';
export declare type PushKeyInfo = {
    id: string;
    name: string;
};
export declare type PushKey = {
    apnsKeyP8: string;
    apnsKeyId: string;
    teamId: string;
    teamName?: string;
};
export declare function isPushKey(obj: {
    [key: string]: any;
}): obj is PushKey;
export declare class PushKeyManager {
    ctx: AppleCtx;
    constructor(appleCtx: AppleCtx);
    list(): Promise<PushKeyInfo[]>;
    create(name?: string): Promise<PushKey>;
    revoke(ids: string[]): Promise<void>;
    format({ id, name }: PushKeyInfo): string;
}
