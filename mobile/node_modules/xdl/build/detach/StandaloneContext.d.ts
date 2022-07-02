import { StandaloneBuildFlags } from '../internal';
declare type StandaloneContextDataType = 'user' | 'service';
declare type StandaloneContextTestEnvironment = 'none' | 'local' | 'ci';
export declare function isStandaloneContextDataUser(value: any): value is StandaloneContextDataUser;
export declare function isStandaloneContextTestEnvironment(value: string): value is StandaloneContextTestEnvironment;
export declare function isStandaloneContextDataService(value: any): value is StandaloneContextDataService;
/**
 *  A user context is used when we are configuring a standalone app locally on a user's machine,
 *  such as during `exp detach`.
 */
export declare type StandaloneContextDataUser = {
    projectPath: string;
    exp: any;
};
/**
 *  A service context is used when we are generating a standalone app remotely on an Expo
 *  service machine, such as during `exp build`.
 */
export declare type StandaloneContextDataService = {
    expoSourcePath: string;
    archivePath: string | null;
    manifest: any;
    privateConfig: any;
    testEnvironment: StandaloneContextTestEnvironment;
    shellAppSdkVersion: string;
};
declare class StandaloneContext {
    data?: StandaloneContextDataUser | StandaloneContextDataService;
    config: any;
    static createUserContext: (projectPath: string, exp: any, publishedUrl?: string | undefined) => StandaloneContextUser;
    static createServiceContext: (expoSourcePath: string, archivePath: string | null, manifest: any, privateConfig: any, testEnvironment: StandaloneContextTestEnvironment, build: StandaloneBuildFlags, publishedUrl: string, releaseChannel: string, shellAppSdkVersion: string) => StandaloneContextService;
    /**
     *  On iOS we begin configuring standalone apps before we have any information about the
     *  project's manifest. By default let's treat all contexts as non-anonymous and override
     *  it in contexts that needs this to be different.
     */
    isAnonymous(): boolean;
}
export declare class StandaloneContextUser extends StandaloneContext {
    data: StandaloneContextDataUser;
    published: {
        url?: string;
        releaseChannel: 'default';
    };
    build: StandaloneBuildFlags;
    type: StandaloneContextDataType;
    constructor(data: StandaloneContextDataUser, published: {
        url?: string;
        releaseChannel: 'default';
    }, build: StandaloneBuildFlags);
}
export declare class StandaloneContextService extends StandaloneContext {
    data: StandaloneContextDataService;
    published: {
        url: string;
        releaseChannel: string;
    };
    build: StandaloneBuildFlags;
    type: StandaloneContextDataType;
    constructor(data: StandaloneContextDataService, published: {
        url: string;
        releaseChannel: string;
    }, build: StandaloneBuildFlags);
    /**
     *  On iOS we begin configuring standalone apps before we have any information about the
     *  project's manifest.
     */
    isAnonymous(): boolean;
}
export declare type AnyStandaloneContext = StandaloneContextUser | StandaloneContextService;
export default StandaloneContext;
