import type { Command } from 'commander';
import { URLOptions } from '../utils/urlOpts';
declare type ProjectUrlOptions = Command & {
    web?: boolean;
};
export declare function actionAsync(projectRoot: string, options: ProjectUrlOptions & URLOptions): Promise<void>;
export {};
