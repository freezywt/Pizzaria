import { ExpoConfig } from '@expo/config';
import { StartDevServerOptions } from '../internal';
export declare function startReactNativeServerAsync({ projectRoot, options, exp, verbose, }: {
    projectRoot: string;
    options: StartDevServerOptions;
    exp?: ExpoConfig;
    verbose?: boolean;
}): Promise<void>;
export declare function stopReactNativeServerAsync(projectRoot: string): Promise<void>;
