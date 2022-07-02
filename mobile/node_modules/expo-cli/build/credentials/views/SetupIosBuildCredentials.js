"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupIosBuildCredentialsFromLocal = exports.SetupIosBuildCredentials = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function appleApi() {
  const data = _interopRequireWildcard(require("../../appleApi"));

  appleApi = function () {
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

function _prompts() {
  const data = _interopRequireWildcard(require("../../utils/prompts"));

  _prompts = function () {
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

function _route() {
  const data = require("../route");

  _route = function () {
    return data;
  };

  return data;
}

function _provisioningProfile() {
  const data = require("../utils/provisioningProfile");

  _provisioningProfile = function () {
    return data;
  };

  return data;
}

function _SetupIosDist() {
  const data = require("./SetupIosDist");

  _SetupIosDist = function () {
    return data;
  };

  return data;
}

function _SetupIosProvisioningProfile() {
  const data = require("./SetupIosProvisioningProfile");

  _SetupIosProvisioningProfile = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupIosBuildCredentials {
  constructor(app) {
    this.app = app;
  }

  async open(ctx) {
    await this.bestEffortAppleCtx(ctx);

    if (ctx.hasAppleCtx()) {
      await appleApi().ensureBundleIdExistsAsync(ctx.appleCtx, this.app, {
        enablePushNotifications: true
      });
    }

    try {
      await (0, _route().runCredentialsManager)(ctx, new (_SetupIosDist().SetupIosDist)(this.app));
    } catch (error) {
      _log().default.error('Failed to set up Distribution Certificate');

      throw error;
    }

    const distCert = await ctx.ios.getDistCert(this.app);

    if (!distCert) {
      throw new (_CommandError().default)('INSUFFICIENT_CREDENTIALS', `This build request requires a valid distribution certificate.`);
    }

    try {
      await (0, _route().runCredentialsManager)(ctx, new (_SetupIosProvisioningProfile().SetupIosProvisioningProfile)(this.app));
    } catch (error) {
      _log().default.error('Failed to set up Provisioning Profile');

      throw error;
    }

    return null;
  } // Try to get the user to provide Apple credentials upfront
  // We will be able to do full validation of their iOS creds this way


  async bestEffortAppleCtx(ctx) {
    if (ctx.hasAppleCtx()) {
      // skip prompts if already have apple ctx
      return;
    }

    if (ctx.nonInteractive) {
      return;
    }

    const confirm = await (0, _prompts().confirmAsync)({
      message: `Do you have access to the Apple account that will be used for submitting this app to the App Store?`
    });

    if (confirm) {
      return await ctx.ensureAppleCtx();
    } else {
      _log().default.log(_chalk().default.green('No problem! 👌 \nWe can’t auto-generate credentials if you don’t have access to the main Apple account. \nBut we can still set it up if you upload your credentials.'));
    }
  }

}

exports.SetupIosBuildCredentials = SetupIosBuildCredentials;

class SetupIosBuildCredentialsFromLocal {
  constructor(app) {
    this.app = app;
  }

  async open(ctx) {
    let localCredentials;

    try {
      localCredentials = await credentialsJsonReader().readIosCredentialsAsync(ctx.projectDir);
    } catch (error) {
      _log().default.error('Reading credentials from credentials.json failed. Make sure this file is correct and all credentials are present there.');

      throw error;
    }

    const team = await (0, _provisioningProfile().readAppleTeam)(localCredentials.provisioningProfile);
    await ctx.ios.updateProvisioningProfile(this.app, { ...team,
      provisioningProfile: localCredentials.provisioningProfile
    });
    const credentials = await ctx.ios.getAllCredentials(this.app.accountName);
    const distCert = await ctx.ios.getDistCert(this.app);
    const appsUsingCert = distCert !== null && distCert !== void 0 && distCert.id ? (credentials.appCredentials || []).filter(cred => cred.distCredentialsId === distCert.id) : [];
    const appInfo = `@${this.app.accountName}/${this.app.projectName} (${this.app.bundleIdentifier})`;
    const newDistCert = { ...team,
      certP12: localCredentials.distributionCertificate.certP12,
      certPassword: localCredentials.distributionCertificate.certPassword
    };

    if (appsUsingCert.length > 1 && distCert !== null && distCert !== void 0 && distCert.id) {
      const {
        update
      } = await (0, _prompts().default)({
        type: 'select',
        name: 'update',
        message: 'Current distribution certificate is used by multiple apps. Do you want to update all of them?',
        choices: [{
          title: 'Update all apps',
          value: 'all'
        }, {
          title: `Update only ${appInfo}`,
          value: 'app'
        }]
      });

      if (update === 'all') {
        await ctx.ios.updateDistCert(distCert.id, this.app.accountName, newDistCert);
      } else {
        const createdDistCert = await ctx.ios.createDistCert(this.app.accountName, newDistCert);
        await ctx.ios.useDistCert(this.app, createdDistCert.id);
      }
    } else if (distCert !== null && distCert !== void 0 && distCert.id) {
      await ctx.ios.updateDistCert(distCert.id, this.app.accountName, newDistCert);
    } else {
      const createdDistCert = await ctx.ios.createDistCert(this.app.accountName, newDistCert);
      await ctx.ios.useDistCert(this.app, createdDistCert.id);
    }

    return null;
  }

}

exports.SetupIosBuildCredentialsFromLocal = SetupIosBuildCredentialsFromLocal;
//# sourceMappingURL=SetupIosBuildCredentials.js.map