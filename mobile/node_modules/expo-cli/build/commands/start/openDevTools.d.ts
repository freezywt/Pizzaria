import { ExpoConfig } from '@expo/config';
export declare function tryOpeningDevToolsAsync(projectRoot: string, { exp, options, }: {
    exp: Pick<ExpoConfig, 'isDetached'>;
    options: {
        nonInteractive?: boolean;
    };
}): Promise<void>;
