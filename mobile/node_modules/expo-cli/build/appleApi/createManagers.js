"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createManagers = void 0;

function _distributionCert() {
  const data = require("./distributionCert");

  _distributionCert = function () {
    return data;
  };

  return data;
}

function _provisioningProfile() {
  const data = require("./provisioningProfile");

  _provisioningProfile = function () {
    return data;
  };

  return data;
}

function _pushKey() {
  const data = require("./pushKey");

  _pushKey = function () {
    return data;
  };

  return data;
}

const createManagers = ctx => ({
  distributionCert: new (_distributionCert().DistCertManager)(ctx),
  pushKey: new (_pushKey().PushKeyManager)(ctx),
  provisioningProfile: new (_provisioningProfile().ProvisioningProfileManager)(ctx)
});

exports.createManagers = createManagers;
//# sourceMappingURL=createManagers.js.map