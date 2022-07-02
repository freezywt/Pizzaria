import { Context, IView } from '../context';
export declare class UpdateFcmKey implements IView {
    private experienceName;
    constructor(experienceName: string);
    open(ctx: Context): Promise<IView | null>;
}
