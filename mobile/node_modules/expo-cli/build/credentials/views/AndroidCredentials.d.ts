import { Context, IView } from '../context';
declare class ExperienceView implements IView {
    private experienceName;
    constructor(experienceName: string);
    open(ctx: Context): Promise<IView | null>;
    handleAction(context: Context, selected: string): IView | null;
}
export { ExperienceView };
