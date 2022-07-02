import { Context, IView } from './context';
import { IQuit } from './views/Select';
export declare function runCredentialsManagerStandalone(ctx: Context, startView: IView): Promise<void>;
export declare function runCredentialsManager(ctx: Context, startView: IView): Promise<null>;
export declare class CredentialsManager {
    static _manager?: CredentialsManager;
    _ctx: Context;
    _mainView: IView;
    _currentView: IView;
    _quit: IQuit;
    constructor(ctx: Context, startView: IView, quit: IQuit);
    static get(): CredentialsManager;
    run(): Promise<null>;
    changeMainView(view: IView): void;
}
