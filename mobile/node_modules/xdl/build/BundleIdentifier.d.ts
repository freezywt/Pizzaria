/**
 * BundleIdentifier.ts
 *
 * NOTE:
 * The code in this module originates from eas-cli and the canonical version of
 * it is in
 * https://github.com/expo/eas-cli/blob/6a0a9bbaaad03b053b5930f7d14bde35b4d0a9f0/packages/eas-cli/src/build/ios/bundleIdentifer.ts#L36
 * Any changes to this code should be applied to eas-cli as well!
 *
 * TODO: move the code for configuring and validating the bundle identifier
 * to a shared package that can be used for both eas-cli and expo-cli.
 */
import { ExpoConfig } from '@expo/config';
export declare function configureBundleIdentifierAsync(projectRoot: string, exp: ExpoConfig): Promise<string>;
