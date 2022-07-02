import { SDKVersion } from 'xdl/build/Versions';
import { DependencyList } from '../../utils/getRemoteVersionsForSdk';
declare type Options = {
    npm?: boolean;
    yarn?: boolean;
};
export declare type ExpoWorkflow = 'managed' | 'bare';
export declare function actionAsync(requestedSdkVersion: string | null, options: Options): Promise<void>;
export declare function maybeFormatSdkVersion(sdkVersionString: string | null): string | null;
/**
 * Produce a list of dependencies used by the project that need to be updated
 */
export declare function getUpdatedDependenciesAsync(projectRoot: string, workflow: ExpoWorkflow, targetSdkVersion: SDKVersion | null, targetSdkVersionString: string): Promise<{
    dependencies: DependencyList;
    removed: string[];
}>;
export declare type UpgradeDependenciesOptions = {
    projectDependencies: DependencyList;
    bundledNativeModules: DependencyList;
    sdkVersion?: string;
    workflow: ExpoWorkflow;
    targetSdkVersion: SDKVersion | null;
    targetSdkVersionString: string | null;
};
export declare function getDependenciesFromBundledNativeModules({ projectDependencies, bundledNativeModules, sdkVersion, workflow, targetSdkVersion, targetSdkVersionString, }: UpgradeDependenciesOptions): DependencyList;
export declare function upgradeAsync({ requestedSdkVersion, projectRoot, workflow, }: {
    requestedSdkVersion: string | null;
    projectRoot: string;
    workflow: ExpoWorkflow;
}, options: Options): Promise<void>;
export {};
