declare type Options = {
    pwa?: boolean;
    clear?: boolean;
    dev?: boolean;
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
