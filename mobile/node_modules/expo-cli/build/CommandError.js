"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SilentError = exports.ErrorCodes = exports.AbortCommandError = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ERROR_PREFIX = 'Error: ';
const ErrorCodes = {
  INVALID_PROJECT_DIR: 'INVALID_PROJECT_DIR',
  INVALID_PROJECT_NAME: 'INVALID_PROJECT_NAME',
  INVALID_RUNTIME_VERSION: 'INVALID_RUNTIME_VERSION',
  INVALID_PUBLIC_URL: 'INVALID_PUBLIC_URL',
  INVALID_UPDATE_URL: 'INVALID_UPDATE_URL',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  NON_INTERACTIVE: 'NON_INTERACTIVE',
  ACCESS_TOKEN_ERROR: 'ACCESS_TOKEN_ERROR',
  BAD_CHOICE: 'BAD_CHOICE',
  MISSING_PUBLIC_URL: 'MISSING_PUBLIC_URL',
  APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR: 'APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR',
  APPLE_PUSH_KEYS_TOO_MANY_GENERATED_ERROR: 'APPLE_PUSH_KEYS_TOO_MANY_GENERATED_ERROR',
  MISSING_SLUG: 'MISSING_SLUG',
  PROJECT_NOT_FOUND: 'PROJECT_NOT_FOUND'
};
exports.ErrorCodes = ErrorCodes;

/**
 * General error, formatted as a message in red text when caught by expo-cli (no stack trace is printed). Should be used in favor of `log.error()` in most cases.
 */
class CommandError extends Error {
  constructor(code, message = '') {
    super(''); // If e.toString() was called to get `message` we don't want it to look
    // like "Error: Error:".

    _defineProperty(this, "name", 'CommandError');

    _defineProperty(this, "isCommandError", true);

    _defineProperty(this, "code", void 0);

    if (message.startsWith(ERROR_PREFIX)) {
      message = message.substring(ERROR_PREFIX.length);
    }

    this.message = message || code;
    this.code = code;
  }

}

exports.default = CommandError;

class AbortCommandError extends CommandError {
  constructor() {
    super('ABORTED', 'Interactive prompt was cancelled.');
  }

}
/**
 * Used to end a CLI process without printing a stack trace in the Expo CLI. Should be used in favor of `process.exit`.
 */


exports.AbortCommandError = AbortCommandError;

class SilentError extends CommandError {
  constructor(messageOrError) {
    var _ref;

    const message = (_ref = typeof messageOrError === 'string' ? messageOrError : messageOrError === null || messageOrError === void 0 ? void 0 : messageOrError.message) !== null && _ref !== void 0 ? _ref : 'This error should fail silently in the CLI';
    super('SILENT', message);

    if (typeof messageOrError !== 'string') {
      var _messageOrError$stack, _messageOrError$name;

      // forward the props of the incoming error for tests or processes outside of expo-cli that use expo cli internals.
      this.stack = (_messageOrError$stack = messageOrError === null || messageOrError === void 0 ? void 0 : messageOrError.stack) !== null && _messageOrError$stack !== void 0 ? _messageOrError$stack : this.stack;
      this.name = (_messageOrError$name = messageOrError === null || messageOrError === void 0 ? void 0 : messageOrError.name) !== null && _messageOrError$name !== void 0 ? _messageOrError$name : this.name;
    }
  }

}

exports.SilentError = SilentError;
//# sourceMappingURL=CommandError.js.map