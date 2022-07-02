import { EjectAsyncOptions } from './prebuildAppAsync';
export declare function actionAsync(projectRoot: string, { platform, clean, skipDependencyUpdate, ...options }: EjectAsyncOptions & {
    npm?: boolean;
    platform?: string;
    clean?: boolean;
    skipDependencyUpdate?: string;
}): Promise<void>;
