import { PublishOptions } from '../internal';
export interface PublishedProjectResult {
    /**
     * Project manifest URL
     */
    url: string;
    /**
     * Project page URL
     */
    projectPageUrl: string;
    /**
     * TODO: What is this?
     */
    ids: string[];
    /**
     * TODO: What is this? Where does it come from?
     */
    err?: string;
}
export declare function publishAsync(projectRoot: string, options?: PublishOptions): Promise<PublishedProjectResult>;
