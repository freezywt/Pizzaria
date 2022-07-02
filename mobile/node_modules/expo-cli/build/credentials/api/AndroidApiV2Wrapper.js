"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// This class should not be used directly, use only as part of cached api client from ./AndroidApi.ts
// or mock it in tests (it's easier to mock this class than ApiV2 directly)
class ApiClient {
  constructor(api) {
    this.api = api;
  }

  async getAllCredentialsApi() {
    var _await$this$api$getAs;

    return ((_await$this$api$getAs = await this.api.getAsync('credentials/android')) === null || _await$this$api$getAs === void 0 ? void 0 : _await$this$api$getAs.credentials) || [];
  }

  async getAllCredentialsForAppApi(experienceName) {
    return await this.api.getAsync(`credentials/android/${experienceName}`);
  }

  async updateKeystoreApi(experienceName, keystore) {
    return await this.api.putAsync(`credentials/android/keystore/${experienceName}`, {
      keystore
    });
  }

  async updateFcmKeyApi(experienceName, fcmApiKey) {
    return await this.api.putAsync(`credentials/android/push/${experienceName}`, {
      fcmApiKey
    });
  }

  async removeKeystoreApi(experienceName) {
    await this.api.deleteAsync(`credentials/android/keystore/${experienceName}`);
  }

  async removeFcmKeyApi(experienceName) {
    await this.api.deleteAsync(`credentials/android/push/${experienceName}`);
  }

}

exports.default = ApiClient;
//# sourceMappingURL=AndroidApiV2Wrapper.js.map