import { Android } from 'xdl';
declare type Options = {
    variant: string;
    device?: boolean | string;
    port?: number;
    bundler?: boolean;
};
export declare type AndroidRunOptions = Omit<Options, 'device'> & {
    apkVariantDirectory: string;
    packageName: string;
    mainActivity: string;
    launchActivity: string;
    device: Android.Device;
    appName: string;
    buildType: string;
    flavors?: string[];
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
