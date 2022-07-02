import { Project } from 'xdl';
import { BundlePlatform } from './createMetadataJson';
export declare const ANONYMOUS_USERNAME = "anonymous";
/**
 * If the `experimentalBundle` flag is true, the structure of the outputDir will be:
 *
 * ```
 * ├── assets
 * │   └── *
 * ├── bundles
 * │   ├── android-01ee6e3ab3e8c16a4d926c91808d5320.js
 * │   └── ios-ee8206cc754d3f7aa9123b7f909d94ea.js
 * └── metadata.json
 * ```
 *
 * If the `experimentalBundle` flag is not true, then this function is for self hosting
 * and the outputDir will have the files created in the project directory the following way:
 *
 * ```
 * ├── android-index.json
 * ├── ios-index.json
 * ├── assets
 * │   └── 1eccbc4c41d49fd81840aef3eaabe862
 * └── bundles
 *       ├── android-01ee6e3ab3e8c16a4d926c91808d5320.js
 *       └── ios-ee8206cc754d3f7aa9123b7f909d94ea.js
 * ```
 */
export declare function exportAppAsync(projectRoot: string, publicUrl: string, assetUrl: string, outputDir: string, options: {
    platforms: BundlePlatform[];
    isDev?: boolean;
    dumpAssetmap?: boolean;
    dumpSourcemap?: boolean;
    publishOptions?: Project.PublishOptions;
}, experimentalBundle: boolean): Promise<void>;
