"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// This class should not be used directly, use only as part of cached api client from ./IosApi.ts
// or mock it in tests (it's easier to mock this class than ApiV2 directly)
class ApiClient {
  constructor(api) {
    this.api = api;
  }

  async getAllCredentialsApi(accountName) {
    return await this.api.getAsync('credentials/ios', {
      owner: accountName
    });
  }

  async getAllCredentialsForAppApi({
    accountName,
    projectName,
    bundleIdentifier
  }) {
    return await this.api.getAsync(`credentials/ios/@${accountName}/${projectName}/${bundleIdentifier}`);
  }

  async getUserCredentialsByIdApi(id, accountName) {
    return await this.api.getAsync(`credentials/ios/userCredentials/${id}`, {
      owner: accountName
    });
  }

  async createDistCertApi(accountName, credentials) {
    const {
      id
    } = await this.api.postAsync('credentials/ios/dist', {
      owner: accountName,
      credentials
    });
    return id;
  }

  async updateDistCertApi(id, accountName, credentials) {
    await this.api.putAsync(`credentials/ios/dist/${id}`, {
      credentials,
      owner: accountName
    });
  }

  async deleteDistCertApi(id, accountName) {
    await this.api.deleteAsync(`credentials/ios/dist/${id}`, {
      owner: accountName
    });
  }

  async useDistCertApi({
    accountName,
    projectName,
    bundleIdentifier
  }, userCredentialsId) {
    await this.api.postAsync('credentials/ios/use/dist', {
      experienceName: `@${accountName}/${projectName}`,
      owner: accountName,
      bundleIdentifier,
      userCredentialsId
    });
  }

  async createPushKeyApi(accountName, credentials) {
    const {
      id
    } = await this.api.postAsync('credentials/ios/push', {
      owner: accountName,
      credentials
    });
    return id;
  }

  async updatePushKeyApi(id, accountName, credentials) {
    return await this.api.putAsync(`credentials/ios/push/${id}`, {
      owner: accountName
    });
  }

  async deletePushKeyApi(id, accountName) {
    await this.api.deleteAsync(`credentials/ios/push/${id}`, {
      owner: accountName
    });
  }

  async usePushKeyApi({
    accountName,
    projectName,
    bundleIdentifier
  }, userCredentialsId) {
    await this.api.postAsync('credentials/ios/use/push', {
      experienceName: `@${accountName}/${projectName}`,
      owner: accountName,
      bundleIdentifier,
      userCredentialsId
    });
  }

  async deletePushCertApi({
    accountName,
    projectName,
    bundleIdentifier
  }) {
    await this.api.postAsync(`credentials/ios/pushCert/delete`, {
      experienceName: `@${accountName}/${projectName}`,
      owner: accountName,
      bundleIdentifier
    });
  }

  async updateProvisioningProfileApi({
    accountName,
    projectName,
    bundleIdentifier
  }, credentials) {
    await this.api.postAsync(`credentials/ios/provisioningProfile/update`, {
      experienceName: `@${accountName}/${projectName}`,
      owner: accountName,
      bundleIdentifier,
      credentials
    });
  }

  async deleteProvisioningProfileApi({
    accountName,
    projectName,
    bundleIdentifier
  }) {
    await this.api.postAsync(`credentials/ios/provisioningProfile/delete`, {
      experienceName: `@${accountName}/${projectName}`,
      owner: accountName,
      bundleIdentifier
    });
  }

}

exports.default = ApiClient;
//# sourceMappingURL=IosApiV2Wrapper.js.map