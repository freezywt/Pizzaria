import { ExpoConfig, PackageJSONConfig } from '@expo/config';
export declare function validateDependenciesVersionsAsync(projectRoot: string, exp: Pick<ExpoConfig, 'sdkVersion'>, pkg: PackageJSONConfig, fixDependencies?: boolean): Promise<boolean>;
