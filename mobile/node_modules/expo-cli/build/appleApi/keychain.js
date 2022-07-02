"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPO_NO_KEYCHAIN = void 0;
exports.deletePasswordAsync = deletePasswordAsync;
exports.getPasswordAsync = getPasswordAsync;
exports.setPasswordAsync = setPasswordAsync;

function _getenv() {
  const data = _interopRequireDefault(require("getenv"));

  _getenv = function () {
    return data;
  };

  return data;
}

function _keychain() {
  const data = _interopRequireDefault(require("keychain"));

  _keychain = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
const KEYCHAIN_TYPE = 'internet';
const IS_MAC = process.platform === 'darwin';
const NO_PASSWORD_REGEX = /Could not find password/; // When enabled, the password will not only be skipped but also deleted.
// This makes it easier to completely opt-out of Keychain functionality.

const EXPO_NO_KEYCHAIN = _getenv().default.boolish('EXPO_NO_KEYCHAIN', false);

exports.EXPO_NO_KEYCHAIN = EXPO_NO_KEYCHAIN;

function deletePasswordAsync({
  username,
  serviceName
}) {
  if (!IS_MAC) {
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    _keychain().default.deletePassword({
      account: username,
      service: serviceName,
      type: KEYCHAIN_TYPE
    }, error => {
      if (error) {
        if (error.message.match(NO_PASSWORD_REGEX)) {
          return resolve(false);
        }

        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

function getPasswordAsync({
  username,
  serviceName
}) {
  if (!IS_MAC) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    _keychain().default.getPassword({
      account: username,
      service: serviceName,
      type: KEYCHAIN_TYPE
    }, (error, password) => {
      if (error) {
        if (error.message.match(NO_PASSWORD_REGEX)) {
          return resolve(null);
        }

        reject(error);
      } else {
        resolve(password);
      }
    });
  });
}

function setPasswordAsync({
  serviceName,
  username,
  password
}) {
  if (!IS_MAC) {
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    _keychain().default.setPassword({
      account: username,
      service: serviceName,
      password,
      type: KEYCHAIN_TYPE
    }, error => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}
//# sourceMappingURL=keychain.js.map