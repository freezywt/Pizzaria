"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAppLookupParams = getAppLookupParams;

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function _keyBy() {
  const data = _interopRequireDefault(require("lodash/keyBy"));

  _keyBy = function () {
    return data;
  };

  return data;
}

function _omit() {
  const data = _interopRequireDefault(require("lodash/omit"));

  _omit = function () {
    return data;
  };

  return data;
}

function _pick() {
  const data = _interopRequireDefault(require("lodash/pick"));

  _pick = function () {
    return data;
  };

  return data;
}

function _IosApiV2Wrapper() {
  const data = _interopRequireDefault(require("./IosApiV2Wrapper"));

  _IosApiV2Wrapper = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getAppLookupParams(experienceName, bundleIdentifier) {
  const matchedExperienceName = experienceName.match(/@(.+)\/(.+)/);
  (0, _assert().default)(matchedExperienceName && matchedExperienceName.length >= 3, 'invalid experience name');
  return {
    accountName: matchedExperienceName[1],
    projectName: matchedExperienceName[2],
    bundleIdentifier
  };
} // appCredentials are identified by `${projectFullName} ${bundleIdentifier}` (see getAppCredentialsCacheIndex method)
// userCredentials are identified by id (string or numeric depending on API)
//
// Expected behaviour of cache (internals)
//
// - when isPrefetched[accountName] true assume everything is synced for that account
// - when credentials[accountName].appCredentials[experienceNameBundleIdentifier] is truthy assume that user and app credentials for that app are synced
// - when accessing user or app credentials identified by AppLookupParams fetch all credentials for that app (user and app credentials)
// - when updating userCredentials refetch only userCredentials
// - when deleting userCredentials modify prefetched appCredentials without calling api
// - when updating provisioningProfile refetch all credentials for that app (user and app credentials)
// - when deleting provisioningProfile modify appCredentials in cache
// - when deleting pushCert refetch all credentials for app (app + user)
//
//


class IosApi {
  constructor(api) {
    _defineProperty(this, "client", void 0);

    _defineProperty(this, "credentials", {});

    _defineProperty(this, "isPrefetched", {});

    this.client = new (_IosApiV2Wrapper().default)(api);
  }

  async getAllCredentials(accountName) {
    var _this$credentials$acc, _this$credentials$acc2, _this$credentials$acc3, _this$credentials$acc4;

    if (!this.isPrefetched[accountName]) {
      const credentials = await this.client.getAllCredentialsApi(accountName);
      this.credentials[accountName] = {
        appCredentials: (0, _keyBy().default)(credentials.appCredentials, cred => `${cred.experienceName} ${cred.bundleIdentifier}`),
        userCredentials: (0, _keyBy().default)(credentials.userCredentials, cred => String(cred.id))
      };
      this.isPrefetched[accountName] = true;
    }

    return {
      appCredentials: Object.values((_this$credentials$acc = (_this$credentials$acc2 = this.credentials[accountName]) === null || _this$credentials$acc2 === void 0 ? void 0 : _this$credentials$acc2.appCredentials) !== null && _this$credentials$acc !== void 0 ? _this$credentials$acc : {}),
      userCredentials: Object.values((_this$credentials$acc3 = (_this$credentials$acc4 = this.credentials[accountName]) === null || _this$credentials$acc4 === void 0 ? void 0 : _this$credentials$acc4.userCredentials) !== null && _this$credentials$acc3 !== void 0 ? _this$credentials$acc3 : {})
    };
  }

  async getDistCert(appLookupParams) {
    var _this$credentials$acc5, _this$credentials$acc6, _this$credentials$acc7, _this$credentials$acc8;

    await this.ensureAppCredentials(appLookupParams);
    const appCredentialsIndex = this.getAppCredentialsCacheIndex(appLookupParams);
    const {
      accountName
    } = appLookupParams;
    const appCredentials = (_this$credentials$acc5 = this.credentials[accountName]) === null || _this$credentials$acc5 === void 0 ? void 0 : (_this$credentials$acc6 = _this$credentials$acc5.appCredentials) === null || _this$credentials$acc6 === void 0 ? void 0 : _this$credentials$acc6[appCredentialsIndex];

    if (!appCredentials || !appCredentials.distCredentialsId) {
      return null;
    }

    const distCert = (_this$credentials$acc7 = this.credentials[accountName]) === null || _this$credentials$acc7 === void 0 ? void 0 : (_this$credentials$acc8 = _this$credentials$acc7.userCredentials) === null || _this$credentials$acc8 === void 0 ? void 0 : _this$credentials$acc8[appCredentials.distCredentialsId];
    return distCert !== null && distCert !== void 0 ? distCert : null;
  }

  async createDistCert(accountName, credentials) {
    var _this$credentials$acc9, _this$credentials$acc10;

    const id = await this.client.createDistCertApi(accountName, credentials); // refetching because www might add some fields (e.g. certSerialNumber)

    await this.refetchUserCredentials(id, accountName);
    const distCert = (_this$credentials$acc9 = this.credentials[accountName]) === null || _this$credentials$acc9 === void 0 ? void 0 : (_this$credentials$acc10 = _this$credentials$acc9.userCredentials) === null || _this$credentials$acc10 === void 0 ? void 0 : _this$credentials$acc10[String(id)];
    (0, _assert().default)(id && distCert, 'distribution certificate does not exists');
    (0, _assert().default)(distCert.type === 'dist-cert', 'wrong type of user credential');
    return distCert;
  }

  async updateDistCert(id, accountName, credentials) {
    var _this$credentials$acc11;

    await this.client.updateDistCertApi(id, accountName, credentials); // refetching because www might add some fields (e.g. certSerialNumber)

    await this.refetchUserCredentials(id, accountName);
    const distCert = (_this$credentials$acc11 = this.credentials[accountName]) === null || _this$credentials$acc11 === void 0 ? void 0 : _this$credentials$acc11.userCredentials[String(id)];
    (0, _assert().default)(distCert, 'distribution certificate does not exists');
    (0, _assert().default)(distCert.type === 'dist-cert', 'wrong type of user credential');
    return distCert;
  }

  async deleteDistCert(id, accountName) {
    await this.client.deleteDistCertApi(id, accountName);
    await this.removeUserCredentialFromCache(id, accountName);
  }

  async useDistCert(appLookupParams, userCredentialsId) {
    await this.client.useDistCertApi(appLookupParams, userCredentialsId);
    await this.refetchAppCredentials(appLookupParams);
  }

  async createPushKey(accountName, credentials) {
    var _this$credentials$acc12, _this$credentials$acc13;

    const id = await this.client.createPushKeyApi(accountName, credentials);
    await this.refetchUserCredentials(id, accountName);
    const pushKey = (_this$credentials$acc12 = this.credentials[accountName]) === null || _this$credentials$acc12 === void 0 ? void 0 : (_this$credentials$acc13 = _this$credentials$acc12.userCredentials) === null || _this$credentials$acc13 === void 0 ? void 0 : _this$credentials$acc13[String(id)];
    (0, _assert().default)(id && pushKey, 'push key does not exists');
    (0, _assert().default)(pushKey.type === 'push-key', 'wrong type of user credentials');
    return pushKey;
  }

  async updatePushKey(id, accountName, credentials) {
    var _this$credentials$acc14, _this$credentials$acc15;

    await this.client.updatePushKeyApi(id, accountName, credentials);
    await this.refetchUserCredentials(id, accountName);
    const pushKey = (_this$credentials$acc14 = this.credentials[accountName]) === null || _this$credentials$acc14 === void 0 ? void 0 : (_this$credentials$acc15 = _this$credentials$acc14.userCredentials) === null || _this$credentials$acc15 === void 0 ? void 0 : _this$credentials$acc15[String(id)];
    (0, _assert().default)(id && pushKey, 'push key does not exists');
    (0, _assert().default)(pushKey.type === 'push-key', 'wrong type of user credentials');
    return pushKey;
  }

  async deletePushKey(id, accountName) {
    await this.client.deletePushKeyApi(id, accountName);
    await this.removeUserCredentialFromCache(id, accountName);
  }

  async getPushKey(appLookupParams) {
    var _this$credentials$acc16, _this$credentials$acc17, _this$credentials$acc18, _this$credentials$acc19;

    await this.ensureAppCredentials(appLookupParams);
    const appCredentialsIndex = this.getAppCredentialsCacheIndex(appLookupParams);
    const {
      accountName
    } = appLookupParams;
    const appCredentials = (_this$credentials$acc16 = this.credentials[accountName]) === null || _this$credentials$acc16 === void 0 ? void 0 : (_this$credentials$acc17 = _this$credentials$acc16.appCredentials) === null || _this$credentials$acc17 === void 0 ? void 0 : _this$credentials$acc17[appCredentialsIndex];

    if (!appCredentials || !appCredentials.pushCredentialsId) {
      return null;
    }

    const pushKey = (_this$credentials$acc18 = this.credentials[accountName]) === null || _this$credentials$acc18 === void 0 ? void 0 : (_this$credentials$acc19 = _this$credentials$acc18.userCredentials) === null || _this$credentials$acc19 === void 0 ? void 0 : _this$credentials$acc19[appCredentials.pushCredentialsId];
    return pushKey !== null && pushKey !== void 0 ? pushKey : null;
  }

  async usePushKey(appLookupParams, userCredentialsId) {
    await this.client.usePushKeyApi(appLookupParams, userCredentialsId);
    await this.refetchAppCredentials(appLookupParams);
  }

  async getPushCert(appLookupParams) {
    var _appCredentials$crede, _appCredentials$crede2, _appCredentials$crede3;

    const appCredentials = await this.getAppCredentials(appLookupParams);
    const pushId = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede = appCredentials.credentials) === null || _appCredentials$crede === void 0 ? void 0 : _appCredentials$crede.pushId;
    const pushP12 = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede2 = appCredentials.credentials) === null || _appCredentials$crede2 === void 0 ? void 0 : _appCredentials$crede2.pushP12;
    const pushPassword = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede3 = appCredentials.credentials) === null || _appCredentials$crede3 === void 0 ? void 0 : _appCredentials$crede3.pushPassword;

    if (!pushId || !pushP12 || !pushPassword) {
      return null;
    }

    return {
      pushId,
      pushP12,
      pushPassword
    };
  }

  async deletePushCert(appLookupParams) {
    await this.client.deletePushCertApi(appLookupParams);
    await this.refetchAppCredentials(appLookupParams);
  }

  async getAppCredentials(appLookupParams) {
    var _this$credentials$acc20, _this$credentials$acc21;

    const appCredentialsIndex = this.getAppCredentialsCacheIndex(appLookupParams);
    const {
      accountName
    } = appLookupParams;
    await this.ensureAppCredentials(appLookupParams);
    return (_this$credentials$acc20 = this.credentials[accountName]) === null || _this$credentials$acc20 === void 0 ? void 0 : (_this$credentials$acc21 = _this$credentials$acc20.appCredentials) === null || _this$credentials$acc21 === void 0 ? void 0 : _this$credentials$acc21[appCredentialsIndex];
  }

  async getProvisioningProfile(appLookupParams) {
    var _appCredentials$crede4;

    const appCredentials = await this.getAppCredentials(appLookupParams);
    const provisioningProfile = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede4 = appCredentials.credentials) === null || _appCredentials$crede4 === void 0 ? void 0 : _appCredentials$crede4.provisioningProfile;

    if (!provisioningProfile) {
      return null;
    }

    return (0, _pick().default)(appCredentials.credentials, ['provisioningProfile', 'provisioningProfileId', 'teamId', 'teamName']);
  }

  async updateProvisioningProfile(appLookupParams, provisioningProfile) {
    var _this$credentials$acc22, _this$credentials$acc23, _this$credentials$acc24;

    const appCredentialsIndex = this.getAppCredentialsCacheIndex(appLookupParams);
    const {
      accountName
    } = appLookupParams;
    await this.client.updateProvisioningProfileApi(appLookupParams, provisioningProfile);
    await this.refetchAppCredentials(appLookupParams);
    return (0, _pick().default)((_this$credentials$acc22 = this.credentials[accountName]) === null || _this$credentials$acc22 === void 0 ? void 0 : (_this$credentials$acc23 = _this$credentials$acc22.appCredentials) === null || _this$credentials$acc23 === void 0 ? void 0 : (_this$credentials$acc24 = _this$credentials$acc23[appCredentialsIndex]) === null || _this$credentials$acc24 === void 0 ? void 0 : _this$credentials$acc24.credentials, ['provisioningProfile', 'provisioningProfileId', 'teamId', 'teamName']);
  }

  async deleteProvisioningProfile(appLookupParams) {
    var _this$credentials, _this$credentials$acc25, _this$credentials$acc26;

    const appCredentialsIndex = this.getAppCredentialsCacheIndex(appLookupParams);
    const {
      accountName
    } = appLookupParams;
    await this.client.deleteProvisioningProfileApi(appLookupParams);
    const appCredentials = (_this$credentials = this.credentials) === null || _this$credentials === void 0 ? void 0 : (_this$credentials$acc25 = _this$credentials[accountName]) === null || _this$credentials$acc25 === void 0 ? void 0 : (_this$credentials$acc26 = _this$credentials$acc25.appCredentials) === null || _this$credentials$acc26 === void 0 ? void 0 : _this$credentials$acc26[appCredentialsIndex];

    if (appCredentials !== null && appCredentials !== void 0 && appCredentials.credentials) {
      // teamId should still be there because it might be part of push cert definition
      appCredentials.credentials = (0, _omit().default)(appCredentials.credentials, ['provisioningProfile', 'provisioningProfileId']);
    }
  }

  getAppCredentialsCacheIndex(appLookupParams) {
    const {
      accountName,
      projectName,
      bundleIdentifier
    } = appLookupParams;
    const projectFullName = `@${accountName}/${projectName}`;
    return `${projectFullName} ${bundleIdentifier}`;
  }

  removeUserCredentialFromCache(id, accountName) {
    var _this$credentials$acc27, _this$credentials$acc28, _this$credentials$acc29;

    if ((_this$credentials$acc27 = this.credentials[accountName]) !== null && _this$credentials$acc27 !== void 0 && (_this$credentials$acc28 = _this$credentials$acc27.userCredentials) !== null && _this$credentials$acc28 !== void 0 && _this$credentials$acc28[String(id)]) {
      delete this.credentials[accountName].userCredentials[String(id)];
    }

    const appCredentials = (_this$credentials$acc29 = this.credentials[accountName]) === null || _this$credentials$acc29 === void 0 ? void 0 : _this$credentials$acc29.appCredentials;

    if (appCredentials) {
      Object.entries(appCredentials).forEach(([key, val]) => {
        if (val.distCredentialsId === id) {
          delete appCredentials[key].distCredentialsId;
        }

        if (val.pushCredentialsId === id) {
          delete appCredentials[key].pushCredentialsId;
        }
      });
    }
  } // ensures that credentials are fetched from the server if they exists
  // if there is no credentials on server for specific app this function should still succeed.


  async ensureAppCredentials(appLookupParams) {
    var _this$credentials2, _this$credentials2$ac, _this$credentials2$ac2;

    const appCredentialsIndex = this.getAppCredentialsCacheIndex(appLookupParams);
    const {
      accountName
    } = appLookupParams;

    if (this.isPrefetched[accountName] || (_this$credentials2 = this.credentials) !== null && _this$credentials2 !== void 0 && (_this$credentials2$ac = _this$credentials2[accountName]) !== null && _this$credentials2$ac !== void 0 && (_this$credentials2$ac2 = _this$credentials2$ac.appCredentials) !== null && _this$credentials2$ac2 !== void 0 && _this$credentials2$ac2[appCredentialsIndex]) {
      return;
    }

    await this.refetchAppCredentials(appLookupParams);
  }

  async refetchUserCredentials(id, accountName) {
    var _this$credentials$acc30;

    const userCredentials = await this.client.getUserCredentialsByIdApi(id, accountName);

    if (!userCredentials || !userCredentials.id) {
      return;
    }

    this.credentials[accountName] = { ...this.credentials[accountName],
      userCredentials: { ...((_this$credentials$acc30 = this.credentials[accountName]) === null || _this$credentials$acc30 === void 0 ? void 0 : _this$credentials$acc30.userCredentials),
        [String(id)]: userCredentials
      }
    };
  }

  async refetchAppCredentials(app) {
    var _this$credentials$acc31, _this$credentials$acc32;

    const {
      accountName
    } = app;
    const appCredentialsIndex = this.getAppCredentialsCacheIndex(app);
    const data = await this.client.getAllCredentialsForAppApi(app);

    if (!data) {
      return;
    }

    this.credentials[accountName] = {
      appCredentials: { ...((_this$credentials$acc31 = this.credentials[accountName]) === null || _this$credentials$acc31 === void 0 ? void 0 : _this$credentials$acc31.appCredentials),
        [appCredentialsIndex]: (0, _omit().default)(data, ['pushCredentials', 'distCredentials'])
      },
      userCredentials: { ...((_this$credentials$acc32 = this.credentials[accountName]) === null || _this$credentials$acc32 === void 0 ? void 0 : _this$credentials$acc32.userCredentials),
        ...(data.pushCredentialsId ? {
          [String(data.pushCredentialsId)]: { ...data.pushCredentials,
            id: data.pushCredentialsId,
            type: 'push-key'
          }
        } : {}),
        ...(data.distCredentialsId ? {
          [String(data.distCredentialsId)]: { ...data.distCredentials,
            id: data.distCredentialsId,
            type: 'dist-cert'
          }
        } : {})
      }
    };
  }

}

exports.default = IosApi;
//# sourceMappingURL=IosApi.js.map