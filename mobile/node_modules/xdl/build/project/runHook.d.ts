import { ExpoConfig, Hook, HookArguments, HookType } from '@expo/config';
export declare type LoadedHook = Hook & {
    _fn: (input: HookArguments) => any;
};
export declare function prepareHooks(hooks: ExpoConfig['hooks'], hookType: HookType, projectRoot: string): LoadedHook[];
export declare function runHook(hook: LoadedHook, hookOptions: Omit<HookArguments, 'config'>): Promise<void>;
