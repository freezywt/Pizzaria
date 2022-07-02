import { EjectAsyncOptions } from './prebuildAppAsync';
export declare function actionAsync(projectRoot: string, { platform, ...options }: Omit<EjectAsyncOptions, 'platforms'> & {
    npm?: boolean;
    platform?: string;
}): Promise<void>;
