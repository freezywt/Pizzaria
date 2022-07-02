declare type Options = {
    template?: string;
    install: boolean;
    npm: boolean;
    yarn: boolean;
    yes: boolean;
};
export declare function actionAsync(incomingProjectRoot: string, command: Partial<Options>): Promise<void>;
export {};
