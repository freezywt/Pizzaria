import { ExpoConfig, PackageJSONConfig } from '@expo/config';
import { ModPlatform } from '@expo/config-plugins';
import { DependenciesModificationResults } from './updatePackageJson';
/**
 *
 * @param projectRoot
 * @param tempDir
 *
 * @return `true` if the project is ejecting, and `false` if it's syncing.
 */
export declare function createNativeProjectsFromTemplateAsync({ projectRoot, exp, pkg, template, tempDir, platforms, skipDependencyUpdate, }: {
    projectRoot: string;
    exp: ExpoConfig;
    pkg: PackageJSONConfig;
    template?: string;
    tempDir: string;
    platforms: ModPlatform[];
    skipDependencyUpdate?: string[];
}): Promise<{
    hasNewProjectFiles: boolean;
    needsPodInstall: boolean;
} & DependenciesModificationResults>;
export declare function resolveBareEntryFile(projectRoot: string, main: any): string | null;
