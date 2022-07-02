declare type Options = {
    type?: string;
    full: boolean;
    json?: boolean;
};
export declare function actionAsync(projectRoot: string, options: Options): Promise<void>;
export {};
