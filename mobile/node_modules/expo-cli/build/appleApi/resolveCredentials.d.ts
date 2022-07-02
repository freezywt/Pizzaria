/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { Auth } from '@expo/apple-utils';
/**
 * Get the username and possibly the password from the environment variables or the supplied options.
 * Password is optional because it's only needed for authentication, but not for re-authentication.
 *
 * @param options
 */
export declare function resolveCredentialsAsync(options: Partial<Auth.UserCredentials>): Promise<Partial<Auth.UserCredentials>>;
export declare function promptPasswordAsync({ username, }: Pick<Auth.UserCredentials, 'username'>): Promise<string>;
export declare function deletePasswordAsync({ username, }: Pick<Auth.UserCredentials, 'username'>): Promise<boolean>;
