import { AppLookupParams } from '../api/IosApi';
import { Context, IView } from '../context';
export declare class SelectPlatform implements IView {
    open(ctx: Context): Promise<IView | null>;
}
export declare class SelectIosExperience implements IView {
    open(ctx: Context): Promise<IView | null>;
    getAppLookupParamsFromContext(ctx: Context): AppLookupParams;
    handleAction(ctx: Context, accountName: string, action: string): IView | null;
}
export declare class SelectAndroidExperience implements IView {
    private askAboutProjectMode;
    open(ctx: Context): Promise<IView | null>;
}
export declare class QuitError extends Error {
    constructor();
}
export interface IQuit {
    runAsync(mainpage: IView): Promise<IView>;
}
export declare class DoQuit implements IQuit {
    runAsync(mainpage: IView): Promise<IView>;
}
export declare class AskQuit implements IQuit {
    runAsync(mainpage: IView): Promise<IView>;
}
