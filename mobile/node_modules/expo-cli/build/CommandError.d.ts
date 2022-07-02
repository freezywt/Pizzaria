export declare const ErrorCodes: {
    INVALID_PROJECT_DIR: string;
    INVALID_PROJECT_NAME: string;
    INVALID_RUNTIME_VERSION: string;
    INVALID_PUBLIC_URL: string;
    INVALID_UPDATE_URL: string;
    NOT_LOGGED_IN: string;
    NON_INTERACTIVE: string;
    ACCESS_TOKEN_ERROR: string;
    BAD_CHOICE: string;
    MISSING_PUBLIC_URL: string;
    APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR: string;
    APPLE_PUSH_KEYS_TOO_MANY_GENERATED_ERROR: string;
    MISSING_SLUG: string;
    PROJECT_NOT_FOUND: string;
};
export declare type ErrorCode = keyof typeof ErrorCodes;
/**
 * General error, formatted as a message in red text when caught by expo-cli (no stack trace is printed). Should be used in favor of `log.error()` in most cases.
 */
export default class CommandError extends Error {
    name: string;
    readonly isCommandError = true;
    code: string;
    constructor(code: string, message?: string);
}
export declare class AbortCommandError extends CommandError {
    constructor();
}
/**
 * Used to end a CLI process without printing a stack trace in the Expo CLI. Should be used in favor of `process.exit`.
 */
export declare class SilentError extends CommandError {
    constructor(messageOrError?: string | Error);
}
