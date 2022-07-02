import { ExpoAppManifest, ExpoConfig } from '@expo/config';
import { BundleAssetWithFileHashes, BundleOutput } from '@expo/dev-server';
declare type ManifestAsset = {
    fileHashes: string[];
    files: string[];
    hash: string;
};
export declare type Asset = ManifestAsset | BundleAssetWithFileHashes;
declare type BundlesByPlatform = {
    android?: BundleOutput;
    ios?: BundleOutput;
};
declare type ExportAssetsOptions = {
    projectRoot: string;
    exp: ExpoAppManifest;
    hostedUrl: string;
    assetPath: string;
    bundles: BundlesByPlatform;
    outputDir?: string;
    experimentalBundle?: boolean;
};
export declare function resolveGoogleServicesFile(projectRoot: string, manifest: ExpoConfig): Promise<void>;
export declare function resolveManifestAssets({ projectRoot, manifest, resolver, strict, }: {
    projectRoot: string;
    manifest: ExpoConfig;
    resolver: (assetPath: string) => Promise<string>;
    strict?: boolean;
}): Promise<void>;
export declare function publishAssetsAsync(options: Pick<ExportAssetsOptions, 'projectRoot' | 'exp' | 'bundles'>): Promise<{
    exp: ExpoAppManifest;
    assets: Asset[];
}>;
export declare function exportAssetsAsync({ projectRoot, exp, hostedUrl, assetPath, outputDir, bundles, experimentalBundle, }: ExportAssetsOptions): Promise<{
    exp: ExpoAppManifest;
    assets: Asset[];
}>;
export {};
