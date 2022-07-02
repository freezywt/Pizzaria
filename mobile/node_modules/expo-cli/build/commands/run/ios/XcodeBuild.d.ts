import { SimControl } from 'xdl';
import { ProjectInfo, XcodeConfiguration } from './resolveOptionsAsync';
export declare type BuildProps = {
    projectRoot: string;
    isSimulator: boolean;
    xcodeProject: ProjectInfo;
    device: Pick<SimControl.XCTraceDevice, 'name' | 'udid'>;
    configuration: XcodeConfiguration;
    shouldSkipInitialBundling: boolean;
    shouldStartBundler: boolean;
    /** Should use derived data for builds. */
    buildCache: boolean;
    terminal?: string;
    port: number;
    scheme: string;
};
declare type XcodeSDKName = 'iphoneos' | 'iphonesimulator';
export declare function logPrettyItem(message: string): void;
export declare function getProjectBuildSettings(xcodeProject: ProjectInfo, configuration: XcodeConfiguration, sdkName: XcodeSDKName, scheme: string): Promise<any>;
/**
 *
 * @returns '/Users/evanbacon/Library/Developer/Xcode/DerivedData/myapp-gpgjqjodrxtervaufttwnsgimhrx/Build/Products/Debug-iphonesimulator/myapp.app'
 */
export declare function getAppBinaryPath(buildOutput: string): string;
export declare function getEscapedPath(filePath: string): string;
export declare function buildAsync({ projectRoot, xcodeProject, device, configuration, isSimulator, scheme, shouldSkipInitialBundling, terminal, port, buildCache, }: BuildProps): Promise<string>;
export {};
