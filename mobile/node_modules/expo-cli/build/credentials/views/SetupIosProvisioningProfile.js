"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupIosProvisioningProfile = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function iosProfileView() {
  const data = _interopRequireWildcard(require("./IosProvisioningProfile"));

  iosProfileView = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupIosProvisioningProfile {
  constructor(app) {
    this.app = app;
  }

  async open(ctx) {
    if (!ctx.user) {
      throw new Error(`This workflow requires you to be logged in.`);
    }

    const distCert = await ctx.ios.getDistCert(this.app);

    if (!distCert) {
      // dist cert should already be created
      // TODO: trigger dist cert creation here
      throw new Error('There is no distribution certificate assigned for this app');
    }

    const appCredentials = await ctx.ios.getAppCredentials(this.app); // Try to use the profile we have on file first

    const configuredProfile = await ctx.ios.getProvisioningProfile(this.app); // We dont have a profile on expo servers or
    // The configured profile is associated with some other dist cert

    const configuredWithSameDistCert = appCredentials.distCredentialsId === distCert.id;

    if (!configuredProfile || !configuredWithSameDistCert) {
      return new (iosProfileView().CreateOrReuseProvisioningProfile)(this.app);
    }

    if (!ctx.hasAppleCtx()) {
      const isValid = await iosProfileView().validateProfileWithoutApple(configuredProfile, distCert, this.app.bundleIdentifier);

      if (!isValid) {
        throw new Error(`The provisioning profile we have on file is no longer valid.`);
      }

      return null;
    } // User uploaded profiles dont have ids - do best effort validation here


    if (!configuredProfile.provisioningProfileId) {
      _log().default.log(_chalk().default.yellow("The provisioning profile we have on file cannot be validated on Apple's servers."));

      const isValid = await iosProfileView().validateProfileWithoutApple(configuredProfile, distCert, this.app.bundleIdentifier);

      if (!isValid) {
        return new (iosProfileView().CreateOrReuseProvisioningProfile)(this.app);
      }

      return null;
    }

    const profileFromApple = await iosProfileView().getAppleInfo(ctx.appleCtx, this.app.bundleIdentifier, configuredProfile); // Profile can't be found on Apple servers

    if (!profileFromApple) {
      return new (iosProfileView().CreateOrReuseProvisioningProfile)(this.app);
    }

    await iosProfileView().configureAndUpdateProvisioningProfile(ctx, this.app, distCert, profileFromApple);
    return null;
  }

}

exports.SetupIosProvisioningProfile = SetupIosProvisioningProfile;
//# sourceMappingURL=SetupIosProvisioningProfile.js.map