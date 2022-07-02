import type { ExpoAppManifest, HookArguments, PackageJSONConfig } from '@expo/config';
import type { BundleOutput } from '@expo/dev-server';
import { ProjectAssets } from 'xdl';
declare type PlatformExpoAppManifest = ExpoAppManifest & {
    platform: string;
    bundleUrl: string;
    dependencies: string[];
};
export declare function writeDebugHtmlAsync({ outputDir, fileNames, }: {
    outputDir: string;
    fileNames: Record<string, string>;
}): Promise<void>;
export declare function writeBundlesAsync({ bundles, outputDir, }: {
    bundles: Record<string, Pick<BundleOutput, 'hermesBytecodeBundle' | 'code'>>;
    outputDir: string;
}): Promise<{
    hashes: Record<string, string>;
    fileNames: Record<string, string>;
}>;
export declare function writeSourceMapsAsync({ bundles, hashes, fileNames, outputDir, removeOriginalSourceMappingUrl, }: {
    bundles: Record<string, Pick<BundleOutput, 'hermesSourcemap' | 'map' | 'hermesBytecodeBundle' | 'code'>>;
    hashes?: Record<string, string>;
    fileNames?: Record<string, string>;
    outputDir: string;
    removeOriginalSourceMappingUrl?: boolean;
}): Promise<{
    platform: string;
    fileName: string;
    hash: string;
    map: string;
    comment: string;
}[]>;
export declare function writeMetadataJsonAsync({ outputDir, bundles, fileNames, }: {
    outputDir: string;
    bundles: Record<string, Pick<BundleOutput, 'assets'>>;
    fileNames: Record<string, string>;
}): Promise<void>;
export declare function writeAssetMapAsync({ outputDir, assets, }: {
    outputDir: string;
    assets: ProjectAssets.Asset[];
}): Promise<{
    [k: string]: ProjectAssets.Asset;
}>;
export declare function writePlatformManifestsAsync({ outputDir, publicUrl, fileNames, exp, pkg, }: {
    outputDir: string;
    publicUrl: string;
    fileNames: Record<string, string>;
    exp: ExpoAppManifest;
    pkg: Pick<PackageJSONConfig, 'dependencies'>;
}): Promise<Record<string, PlatformExpoAppManifest>>;
export declare type MultiPlatformBundleInfo = Pick<HookArguments, 'androidManifestUrl' | 'androidBundle' | 'androidManifest' | 'androidSourceMap' | 'iosManifestUrl' | 'iosBundle' | 'iosManifest' | 'iosSourceMap'>;
export declare function createMultiPlatformBundleInfo({ publicUrl, bundles, manifests, }: {
    publicUrl: string;
    bundles: Record<string, Pick<BundleOutput, 'hermesBytecodeBundle' | 'code' | 'hermesSourcemap' | 'map'>>;
    manifests: Record<string, PlatformExpoAppManifest>;
}): MultiPlatformBundleInfo;
export {};
