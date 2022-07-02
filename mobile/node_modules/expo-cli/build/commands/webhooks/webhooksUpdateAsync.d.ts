import { WebhookEvent } from './utils';
declare type Options = {
    id?: string;
    url?: string;
    event?: WebhookEvent;
    secret?: string;
};
export declare function actionAsync(projectRoot: string, { id, url, event, ...options }: Options): Promise<void>;
export {};
