import { Project } from 'xdl';
export declare function setGlobalDevClientSettingsAsync(projectRoot: string): Promise<void>;
export declare function startBundlerAsync(projectRoot: string, { metroPort, platforms }: Pick<Project.StartOptions, 'metroPort' | 'platforms'>): Promise<void>;
