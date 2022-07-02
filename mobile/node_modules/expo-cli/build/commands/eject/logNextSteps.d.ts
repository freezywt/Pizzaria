import { PrebuildResults } from './prebuildAppAsync';
export declare function logNextSteps({ exp, hasNewProjectFiles, platforms, podInstall, nodeInstall, packageManager }: PrebuildResults, { legacyUpdates, }: {
    legacyUpdates: boolean;
}): void;
