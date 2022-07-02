/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { BundleId, Profile, RequestContext } from '@expo/apple-utils';
export declare function getProfilesForBundleIdAsync(context: RequestContext, bundleIdentifier: string): Promise<Profile[]>;
export declare function getBundleIdForIdentifierAsync(context: RequestContext, bundleIdentifier: string): Promise<BundleId>;
