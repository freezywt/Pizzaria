import { WebhookEvent } from './utils';
declare type Options = {
    url?: string;
    event?: WebhookEvent;
    secret?: string;
};
export declare function actionAsync(projectRoot: string, { url, event, ...options }: Options): Promise<void>;
export {};
