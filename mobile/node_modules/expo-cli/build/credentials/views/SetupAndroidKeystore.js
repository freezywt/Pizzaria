"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupAndroidKeystore = exports.SetupAndroidBuildCredentialsFromLocal = void 0;

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function credentialsJsonReader() {
  const data = _interopRequireWildcard(require("../credentialsJson/read"));

  credentialsJsonReader = function () {
    return data;
  };

  return data;
}

function _validateKeystore() {
  const data = _interopRequireDefault(require("../utils/validateKeystore"));

  _validateKeystore = function () {
    return data;
  };

  return data;
}

function _AndroidKeystore() {
  const data = require("./AndroidKeystore");

  _AndroidKeystore = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupAndroidKeystore {
  constructor(experienceName, options) {
    this.experienceName = experienceName;
    this.options = options;
  }

  async open(ctx) {
    var _await$ctx$android$fe;

    const {
      keystore,
      keystorePassword,
      keyAlias,
      keyPassword
    } = (_await$ctx$android$fe = await ctx.android.fetchKeystore(this.experienceName)) !== null && _await$ctx$android$fe !== void 0 ? _await$ctx$android$fe : {};

    if (keystore && keystorePassword && keyAlias && keyPassword) {
      return null;
    }

    if (this.options.nonInteractive) {
      if (this.options.allowMissingKeystore) {
        _log().default.warn('There is no valid Keystore defined for this app, new one will be generated on Expo servers.');

        return null;
      } else {
        throw new Error('Generating a new Keystore is not supported in --non-interactive mode');
      }
    }

    return new (_AndroidKeystore().UpdateKeystore)(this.experienceName, {
      bestEffortKeystoreGeneration: true,
      skipKeystoreValidation: this.options.skipKeystoreValidation
    });
  }

}

exports.SetupAndroidKeystore = SetupAndroidKeystore;

class SetupAndroidBuildCredentialsFromLocal {
  constructor(experienceName, options) {
    this.experienceName = experienceName;
    this.options = options;
  }

  async open(ctx) {
    let localCredentials;

    try {
      localCredentials = await credentialsJsonReader().readAndroidCredentialsAsync(ctx.projectDir);
    } catch (error) {
      _log().default.error('Reading credentials from credentials.json failed. Make sure this file is correct and all credentials are present there.');

      throw error;
    }

    if (!this.options.skipKeystoreValidation) {
      await (0, _validateKeystore().default)(localCredentials.keystore);
    }

    await ctx.android.updateKeystore(this.experienceName, localCredentials.keystore);
    return null;
  }

}

exports.SetupAndroidBuildCredentialsFromLocal = SetupAndroidBuildCredentialsFromLocal;
//# sourceMappingURL=SetupAndroidKeystore.js.map