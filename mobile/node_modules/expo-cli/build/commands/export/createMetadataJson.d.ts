import type { BundleOutput } from '@expo/dev-server';
export declare type BundlePlatform = 'android' | 'ios';
declare type PlatformMetadata = {
    bundle: string;
    assets: {
        path: string;
        ext: string;
    }[];
};
declare type FileMetadata = {
    [key in BundlePlatform]: PlatformMetadata;
};
declare type Metadata = {
    version: 0;
    bundler: 'metro';
    fileMetadata: FileMetadata;
};
export declare function createMetadataJson({ bundles, fileNames, }: {
    bundles: Record<string, Pick<BundleOutput, 'assets'>>;
    fileNames: Record<string, string>;
}): Metadata;
export {};
