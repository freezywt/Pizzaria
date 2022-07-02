"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _keyBy() {
  const data = _interopRequireDefault(require("lodash/keyBy"));

  _keyBy = function () {
    return data;
  };

  return data;
}

function _AndroidApiV2Wrapper() {
  const data = _interopRequireDefault(require("./AndroidApiV2Wrapper"));

  _AndroidApiV2Wrapper = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class AndroidApi {
  constructor(api) {
    _defineProperty(this, "client", void 0);

    _defineProperty(this, "shouldRefetchAll", true);

    _defineProperty(this, "credentials", {});

    this.client = new (_AndroidApiV2Wrapper().default)(api);
  }

  async fetchAll() {
    if (this.shouldRefetchAll) {
      this.credentials = (0, _keyBy().default)(await this.client.getAllCredentialsApi(), 'experienceName');
      this.shouldRefetchAll = false;
    }

    return this.credentials;
  }

  async fetchKeystore(experienceName) {
    var _this$credentials$exp;

    await this.ensureCredentialsFetched(experienceName);
    return ((_this$credentials$exp = this.credentials[experienceName]) === null || _this$credentials$exp === void 0 ? void 0 : _this$credentials$exp.keystore) || null;
  }

  async fetchCredentials(experienceName) {
    await this.ensureCredentialsFetched(experienceName);
    return this.credentials[experienceName];
  }

  async updateKeystore(experienceName, keystore) {
    var _this$credentials$exp2;

    await this.ensureCredentialsFetched(experienceName);
    await this.client.updateKeystoreApi(experienceName, keystore);
    this.credentials[experienceName] = {
      experienceName,
      keystore,
      pushCredentials: (_this$credentials$exp2 = this.credentials[experienceName]) === null || _this$credentials$exp2 === void 0 ? void 0 : _this$credentials$exp2.pushCredentials
    };
  }

  async fetchFcmKey(experienceName) {
    var _this$credentials, _this$credentials$exp3;

    await this.ensureCredentialsFetched(experienceName);
    return (_this$credentials = this.credentials) === null || _this$credentials === void 0 ? void 0 : (_this$credentials$exp3 = _this$credentials[experienceName]) === null || _this$credentials$exp3 === void 0 ? void 0 : _this$credentials$exp3.pushCredentials;
  }

  async updateFcmKey(experienceName, fcmApiKey) {
    var _this$credentials$exp4;

    await this.ensureCredentialsFetched(experienceName);
    await this.client.updateFcmKeyApi(experienceName, fcmApiKey);
    this.credentials[experienceName] = {
      experienceName,
      keystore: (_this$credentials$exp4 = this.credentials[experienceName]) === null || _this$credentials$exp4 === void 0 ? void 0 : _this$credentials$exp4.keystore,
      pushCredentials: {
        fcmApiKey
      }
    };
  }

  async removeFcmKey(experienceName) {
    await this.ensureCredentialsFetched(experienceName);
    await this.client.removeFcmKeyApi(experienceName);

    if (this.credentials[experienceName]) {
      this.credentials[experienceName].pushCredentials = null;
    }
  }

  async removeKeystore(experienceName) {
    await this.ensureCredentialsFetched(experienceName);
    await this.client.removeKeystoreApi(experienceName);

    if (this.credentials[experienceName]) {
      this.credentials[experienceName].keystore = null;
    }
  }

  async ensureCredentialsFetched(experienceName) {
    if (!this.credentials[experienceName]) {
      const response = await this.client.getAllCredentialsForAppApi(experienceName);
      this.credentials[experienceName] = {
        experienceName,
        keystore: response === null || response === void 0 ? void 0 : response.keystore,
        pushCredentials: response === null || response === void 0 ? void 0 : response.pushCredentials
      };
    }
  }

}

exports.default = AndroidApi;
//# sourceMappingURL=AndroidApi.js.map