import { Platform } from '@expo/config';
import { BundleOutput } from '@expo/dev-server';
import { PublishOptions } from '../internal';
export declare function printBundleSizes(bundles: {
    android?: BundleOutput;
    ios?: BundleOutput;
}): void;
export declare function createBundlesAsync(projectRoot: string, publishOptions: PublishOptions | undefined, bundleOptions: {
    platforms: Platform[];
    dev?: boolean;
    useDevServer: boolean;
}): Promise<Partial<Record<Platform, BundleOutput>>>;
