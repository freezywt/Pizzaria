import { ExpoConfig } from '@expo/config-types';
export declare function startSession(projectRoot: string, exp: Pick<ExpoConfig, 'name' | 'description' | 'slug' | 'primaryColor'>, platform: 'native' | 'web', forceUpdate?: boolean): Promise<void>;
export declare function stopSession(): void;
