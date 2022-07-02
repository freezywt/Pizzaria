import { Context, IView } from '../context';
interface Options {
    nonInteractive?: boolean;
    allowMissingKeystore?: boolean;
    skipKeystoreValidation: boolean;
}
export declare class SetupAndroidKeystore implements IView {
    private experienceName;
    private options;
    constructor(experienceName: string, options: Options);
    open(ctx: Context): Promise<IView | null>;
}
export declare class SetupAndroidBuildCredentialsFromLocal implements IView {
    private experienceName;
    private options;
    constructor(experienceName: string, options: {
        skipKeystoreValidation: boolean;
    });
    open(ctx: Context): Promise<IView | null>;
}
export {};
