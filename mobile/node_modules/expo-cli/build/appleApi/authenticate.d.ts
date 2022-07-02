/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { RequestContext, Session } from '@expo/apple-utils';
export declare type Options = {
    appleId?: string;
    teamId?: string;
    /**
     * Can be used to restore the Apple auth state via apple-utils.
     */
    cookies?: Session.AuthState['cookies'];
};
export declare type Team = {
    id: string;
    name?: string;
    inHouse?: boolean;
};
export declare type AppleCtx = {
    appleId: string;
    appleIdPassword?: string;
    team: Team;
    /**
     * Defined when using Fastlane
     */
    fastlaneSession?: string;
    /**
     * Can be used to restore the Apple auth state via apple-utils.
     */
    authState?: Session.AuthState;
};
export declare function getRequestContext(authCtx: AppleCtx): RequestContext;
export declare function authenticateAsync(options?: Options): Promise<AppleCtx>;
