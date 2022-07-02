declare type Options = {
    platform?: 'android' | 'ios';
    parent?: {
        nonInteractive: boolean;
    };
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
