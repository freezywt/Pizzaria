declare type Options = {
    releaseChannel?: string;
    sdkVersion?: string;
    platform?: string;
    channelId?: string;
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
