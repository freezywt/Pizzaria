declare type Options = {
    platform?: string;
    skipXcodeConfig: boolean;
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
