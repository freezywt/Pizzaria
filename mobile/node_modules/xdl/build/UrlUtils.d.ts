import { ExpoConfig } from '@expo/config';
import { ProjectSettings } from './internal';
interface URLOptions extends ProjectSettings.ProjectSettings {
    urlType: null | 'exp' | 'http' | 'no-protocol' | 'redirect' | 'custom';
}
interface MetroQueryOptions {
    dev?: boolean;
    strict?: boolean;
    minify?: boolean;
}
export declare function constructBundleUrlAsync(projectRoot: string, opts: Partial<URLOptions>, requestHostname?: string): Promise<string>;
export declare function constructDeepLinkAsync(projectRoot: string, opts?: Partial<URLOptions>, requestHostname?: string): Promise<string>;
export declare function constructManifestUrlAsync(projectRoot: string, opts?: Partial<URLOptions>, requestHostname?: string): Promise<string>;
export declare function constructDevClientUrlAsync(projectRoot: string, opts?: Partial<URLOptions>, requestHostname?: string): Promise<string>;
export declare function constructHostUriAsync(projectRoot: string, requestHostname?: string): Promise<string>;
export declare function constructLogUrlAsync(projectRoot: string, requestHostname?: string): Promise<string>;
export declare function constructLoadingUrlAsync(projectRoot: string, platform: 'ios' | 'android' | null, requestHostname?: string): Promise<string>;
export declare function constructUrlWithExtensionAsync(projectRoot: string, entryPoint: string, ext: string, requestHostname?: string, metroQueryOptions?: MetroQueryOptions): Promise<string>;
export declare function constructPublishUrlAsync(projectRoot: string, entryPoint: string, requestHostname?: string, metroQueryOptions?: MetroQueryOptions): Promise<string>;
export declare function constructSourceMapUrlAsync(projectRoot: string, entryPoint: string, requestHostname?: string): Promise<string>;
export declare function constructAssetsUrlAsync(projectRoot: string, entryPoint: string, requestHostname?: string): Promise<string>;
export declare function constructDebuggerHostAsync(projectRoot: string, requestHostname?: string): Promise<string>;
export declare function constructBundleQueryParams(projectRoot: string, opts: MetroQueryOptions): string;
export declare function constructBundleQueryParamsWithConfig(projectRoot: string, opts: MetroQueryOptions, exp: Pick<ExpoConfig, 'sdkVersion'>): string;
export declare function constructWebAppUrlAsync(projectRoot: string, options?: {
    hostType?: 'localhost' | 'lan' | 'tunnel';
}): Promise<string | null>;
export declare function constructUrlAsync(projectRoot: string, incomingOpts: Partial<URLOptions> | null, isPackager: boolean, requestHostname?: string): Promise<string>;
export declare function stripJSExtension(entryPoint: string): string;
export declare function isHttps(urlString: string): boolean;
export declare function isURL(urlString: string, { protocols, requireProtocol }: {
    protocols?: string[];
    requireProtocol?: boolean;
}): boolean;
export {};
