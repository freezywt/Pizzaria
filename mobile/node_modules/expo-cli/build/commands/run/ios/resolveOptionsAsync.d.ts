import * as XcodeBuild from './XcodeBuild';
export declare type XcodeConfiguration = 'Debug' | 'Release';
export declare type Options = {
    device?: string | boolean;
    port?: number;
    scheme?: string;
    configuration?: XcodeConfiguration;
    bundler?: boolean;
    install?: boolean;
    /** Should use derived data for builds. */
    buildCache: boolean;
};
export declare type ProjectInfo = {
    isWorkspace: boolean;
    name: string;
};
export declare function resolveOptionsAsync(projectRoot: string, options: Options): Promise<XcodeBuild.BuildProps>;
