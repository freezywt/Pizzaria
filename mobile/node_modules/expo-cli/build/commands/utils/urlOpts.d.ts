import type { Command } from 'commander';
import { ProjectSettings } from 'xdl';
export declare type URLOptions = {
    devClient?: boolean;
    android?: boolean;
    ios?: boolean;
    web?: boolean;
    scheme?: string;
    host?: 'lan' | 'tunnel' | 'localhost';
    tunnel?: boolean;
    lan?: boolean;
    localhost?: boolean;
};
declare function addOptions(program: Command): void;
declare function optsAsync(projectRoot: string, options: any): Promise<ProjectSettings.ProjectSettings>;
declare function printQRCode(url: string): void;
declare function handleMobileOptsAsync(projectRoot: string, options: Pick<URLOptions, 'devClient' | 'ios' | 'android' | 'web'> & {
    webOnly?: boolean;
}): Promise<boolean>;
declare const _default: {
    addOptions: typeof addOptions;
    handleMobileOptsAsync: typeof handleMobileOptsAsync;
    printQRCode: typeof printQRCode;
    optsAsync: typeof optsAsync;
};
export default _default;
