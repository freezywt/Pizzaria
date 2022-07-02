export declare type Options = {
    parent?: {
        nonInteractive: boolean;
    };
};
export declare function actionAsync(command: Options): Promise<void>;
