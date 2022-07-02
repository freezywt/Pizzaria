declare type Options = {
    releaseChannel?: string;
    publishId?: string;
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
