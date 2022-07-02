"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseExistingProvisioningProfile = exports.RemoveProvisioningProfile = exports.CreateProvisioningProfile = exports.CreateOrReuseProvisioningProfile = void 0;
exports.configureAndUpdateProvisioningProfile = configureAndUpdateProvisioningProfile;
exports.getAppleInfo = getAppleInfo;
exports.getProvisioningProfileFromParams = getProvisioningProfileFromParams;
exports.useProvisioningProfileFromParams = useProvisioningProfileFromParams;
exports.validateProfileWithoutApple = validateProfileWithoutApple;

function _plist() {
  const data = _interopRequireDefault(require("@expo/plist"));

  _plist = function () {
    return data;
  };

  return data;
}

function _assert() {
  const data = _interopRequireDefault(require("assert"));

  _assert = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
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

function _appleApi() {
  const data = require("../../appleApi");

  _appleApi = function () {
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

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
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

function _list() {
  const data = require("../actions/list");

  _list = function () {
    return data;
  };

  return data;
}

function _promptForCredentials() {
  const data = require("../actions/promptForCredentials");

  _promptForCredentials = function () {
    return data;
  };

  return data;
}

function _IosApi() {
  const data = require("../api/IosApi");

  _IosApi = function () {
    return data;
  };

  return data;
}

function _credentials() {
  const data = require("../credentials");

  _credentials = function () {
    return data;
  };

  return data;
}

function provisioningProfileUtils() {
  const data = _interopRequireWildcard(require("../utils/provisioningProfile"));

  provisioningProfileUtils = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RemoveProvisioningProfile {
  constructor(accountName, shouldRevoke = false) {
    this.accountName = accountName;
    this.shouldRevoke = shouldRevoke;
  }

  async open(ctx) {
    const credentials = await ctx.ios.getAllCredentials(this.accountName);
    const selected = await selectProfileFromExpo(credentials);

    if (selected) {
      const app = (0, _IosApi().getAppLookupParams)(selected.experienceName, selected.bundleIdentifier);
      await this.removeSpecific(ctx, app);

      _log().default.log(_chalk().default.green(`Successfully removed Provisioning Profile for ${selected.experienceName} (${selected.bundleIdentifier})`));
    }

    return null;
  }

  async removeSpecific(ctx, app) {
    _log().default.log('Removing Provisioning Profile...\n');

    await ctx.ios.deleteProvisioningProfile(app);
    let shouldRevoke = this.shouldRevoke;

    if (!shouldRevoke && !ctx.nonInteractive) {
      const revoke = await (0, _prompts().confirmAsync)({
        message: 'Do you also want to revoke this Provisioning Profile on Apple Developer Portal?'
      });
      shouldRevoke = revoke;
    }

    if (shouldRevoke) {
      await ctx.ensureAppleCtx();
      const ppManager = new (_appleApi().ProvisioningProfileManager)(ctx.appleCtx);
      await ppManager.revoke(app.bundleIdentifier);
    }
  }

}

exports.RemoveProvisioningProfile = RemoveProvisioningProfile;

class CreateProvisioningProfile {
  constructor(app) {
    this.app = app;
  }

  async create(ctx) {
    const provisioningProfile = await this.provideOrGenerate(ctx);
    return await ctx.ios.updateProvisioningProfile(this.app, provisioningProfile);
  }

  async open(ctx) {
    await this.create(ctx);

    _log().default.log(_chalk().default.green('Successfully created Provisioning Profile\n'));

    const appCredentials = await ctx.ios.getAppCredentials(this.app);
    (0, _list().displayIosAppCredentials)(appCredentials);

    _log().default.log();

    return null;
  }

  async provideOrGenerate(ctx) {
    if (!ctx.nonInteractive) {
      const userProvided = await (0, _promptForCredentials().askForUserProvided)(_credentials().provisioningProfileSchema);

      if (userProvided) {
        // userProvided profiles don't come with ProvisioningProfileId's (only accessible from Apple Portal API)
        _log().default.log(_chalk().default.yellow('Provisioning profile: Unable to validate specified profile.'));

        return { ...userProvided,
          ...provisioningProfileUtils().readAppleTeam(userProvided.provisioningProfile)
        };
      }
    }

    const distCert = await ctx.ios.getDistCert(this.app);
    (0, _assert().default)(distCert, 'missing distribution certificate');
    return await generateProvisioningProfile(ctx, this.app.bundleIdentifier, distCert);
  }

}

exports.CreateProvisioningProfile = CreateProvisioningProfile;

class UseExistingProvisioningProfile {
  constructor(app) {
    this.app = app;
  }

  async open(ctx) {
    await ctx.ensureAppleCtx();

    if (ctx.nonInteractive) {
      throw new (_CommandError().default)('NON_INTERACTIVE', "Start the CLI without the '--non-interactive' flag to select a distribution certificate.");
    }

    const selected = await selectProfileFromApple(ctx.appleCtx, this.app.bundleIdentifier);

    if (selected) {
      const distCert = await ctx.ios.getDistCert(this.app);
      (0, _assert().default)(distCert, 'missing distribution certificate');
      await configureAndUpdateProvisioningProfile(ctx, this.app, distCert, selected);
    }

    return null;
  }

}

exports.UseExistingProvisioningProfile = UseExistingProvisioningProfile;

class CreateOrReuseProvisioningProfile {
  constructor(app) {
    this.app = app;
  }

  choosePreferred(profiles, distCert) {
    // prefer the profile that already has the same dist cert associated with it
    const profileWithSameCert = profiles.find(profile => profile.certificates.some(cert => cert.id === distCert.certId)); // if not, just get an arbitrary profile

    return profileWithSameCert || profiles[0];
  }

  async open(ctx) {
    if (!ctx.user) {
      throw new Error(`This workflow requires you to be logged in.`);
    }

    if (!ctx.hasAppleCtx()) {
      return new CreateProvisioningProfile(this.app);
    }

    const ppManager = new (_appleApi().ProvisioningProfileManager)(ctx.appleCtx);
    const existingProfiles = await ppManager.list(this.app.bundleIdentifier);

    if (existingProfiles.length === 0) {
      return new CreateProvisioningProfile(this.app);
    }

    const distCert = await ctx.ios.getDistCert(this.app);
    (0, _assert().default)(distCert, 'missing distribution certificate');
    const autoselectedProfile = this.choosePreferred(existingProfiles, distCert); // autoselect creds if we find valid certs

    if (!ctx.nonInteractive) {
      const confirm = await (0, _prompts().confirmAsync)({
        message: `${formatProvisioningProfileFromApple(autoselectedProfile)} \n Would you like to use this profile?`,
        limit: Infinity
      });

      if (!confirm) {
        return await this._createOrReuse(ctx);
      }
    }

    _log().default.log(`Using Provisioning Profile: ${autoselectedProfile.provisioningProfileId}`);

    await configureAndUpdateProvisioningProfile(ctx, this.app, distCert, autoselectedProfile);
    return null;
  }

  async _createOrReuse(ctx) {
    const choices = [{
      title: '[Choose existing provisioning profile] (Recommended)',
      value: 'CHOOSE_EXISTING'
    }, {
      title: '[Add a new provisioning profile]',
      value: 'GENERATE'
    }];
    const question = {
      type: 'select',
      name: 'action',
      message: 'Select a Provisioning Profile:',
      choices,
      optionsPerPage: 20
    };
    const {
      action
    } = await (0, _prompts().default)(question);

    if (action === 'GENERATE') {
      return new CreateProvisioningProfile(this.app);
    } else if (action === 'CHOOSE_EXISTING') {
      return new UseExistingProvisioningProfile(this.app);
    }

    throw new Error('unsupported action');
  }

}

exports.CreateOrReuseProvisioningProfile = CreateOrReuseProvisioningProfile;

async function selectProfileFromApple(appleCtx, bundleIdentifier) {
  const ppManager = new (_appleApi().ProvisioningProfileManager)(appleCtx);
  const profiles = await ppManager.list(bundleIdentifier);

  if (profiles.length === 0) {
    _log().default.warn(`There are no Provisioning Profiles available in your apple account for bundleIdentifier: ${bundleIdentifier}`);

    return null;
  }

  const question = {
    type: 'select',
    name: 'credentialsIndex',
    message: 'Select Provisioning Profile from the list.',
    choices: profiles.map((entry, index) => ({
      title: formatProvisioningProfileFromApple(entry),
      value: index
    }))
  };
  const {
    credentialsIndex
  } = await (0, _prompts().default)(question);
  return profiles[credentialsIndex];
}

async function selectProfileFromExpo(iosCredentials) {
  const profiles = iosCredentials.appCredentials.filter(({
    credentials
  }) => !!credentials.provisioningProfile && !!credentials.provisioningProfileId);

  if (profiles.length === 0) {
    _log().default.warn('There are no Provisioning Profiles available in your account');

    return null;
  }

  const getName = profile => {
    const id = _chalk().default.green(profile.credentials.provisioningProfileId || '-----');

    const teamId = profile.credentials.teamId || '------';
    return `Provisioning Profile (ID: ${id}, Team ID: ${teamId})`;
  };

  const question = {
    type: 'select',
    name: 'credentialsIndex',
    message: 'Select Provisioning Profile from the list.',
    choices: profiles.map((entry, index) => ({
      title: getName(entry),
      value: index
    }))
  };
  const {
    credentialsIndex
  } = await (0, _prompts().default)(question);
  return profiles[credentialsIndex];
}

async function generateProvisioningProfile(ctx, bundleIdentifier, distCert) {
  await ctx.ensureAppleCtx();
  const manager = new (_appleApi().ProvisioningProfileManager)(ctx.appleCtx);
  const type = ctx.appleCtx.team.inHouse ? 'Enterprise ' : 'AppStore';
  const profileName = `*[expo] ${bundleIdentifier} ${type} ${new Date().toISOString()}`; // Apple drops [ if its the first char (!!)

  return await manager.create(bundleIdentifier, distCert, profileName);
} // Best effort validation without Apple credentials


async function validateProfileWithoutApple(provisioningProfile, distCert, bundleIdentifier) {
  const spinner = (0, _ora().ora)(`Performing best effort validation of Provisioning Profile...\n`).start();
  const base64EncodedProfile = provisioningProfile.provisioningProfile;

  if (!base64EncodedProfile) {
    spinner.fail('No profile on file');
    return false;
  }

  const buffer = Buffer.from(base64EncodedProfile, 'base64');
  const profile = buffer.toString('utf-8');

  const profilePlist = _plist().default.parse(profile);

  try {
    const distCertFingerprint = await _xdl().PKCS12Utils.getP12CertFingerprint(distCert.certP12, distCert.certPassword);

    _xdl().IosCodeSigning.validateProvisioningProfile(profilePlist, {
      distCertFingerprint,
      bundleIdentifier
    });
  } catch (e) {
    spinner.fail(`Provisioning profile is invalid: ${e.toString()}`);
    return false;
  }

  const isExpired = new Date(profilePlist['ExpirationDate']) <= new Date();

  if (isExpired) {
    spinner.fail('Provisioning profile is expired');
    return false;
  }

  spinner.succeed('Successfully performed best effort validation of Provisioning Profile.');
  return true;
}

async function getAppleInfo(appleCtx, bundleIdentifier, profile) {
  if (!profile.provisioningProfileId) {
    _log().default.log(_chalk().default.yellow('Provisioning Profile: cannot look up profile on Apple Servers - there is no id'));

    return null;
  }

  const spinner = (0, _ora().ora)(`Getting Provisioning Profile info from Apple's Servers...\n`).start();
  const ppManager = new (_appleApi().ProvisioningProfileManager)(appleCtx);
  const profilesFromApple = await ppManager.list(bundleIdentifier);
  const configuredProfileFromApple = profilesFromApple.find(appleProfile => appleProfile.provisioningProfileId === profile.provisioningProfileId);

  if (!configuredProfileFromApple) {
    spinner.fail(`Provisioning Profile: ${profile.provisioningProfileId} does not exist on Apple Servers`);
    return null;
  }

  spinner.succeed(`Successfully fetched Provisioning Profile ${profile.provisioningProfileId} from Apple Servers`);
  return configuredProfileFromApple;
}

async function configureAndUpdateProvisioningProfile(ctx, app, distCert, profileFromApple) {
  // configure profile on Apple's Server to use our distCert
  const ppManager = new (_appleApi().ProvisioningProfileManager)(ctx.appleCtx);
  const updatedProfile = await ppManager.useExisting(app.bundleIdentifier, profileFromApple, distCert);

  _log().default.log(_chalk().default.green(`Successfully configured Provisioning Profile ${profileFromApple.provisioningProfileId} on Apple Servers with Distribution Certificate ${distCert.certId || ''}`)); // Update profile on expo servers


  await ctx.ios.updateProvisioningProfile(app, updatedProfile);

  _log().default.log(_chalk().default.green(`Successfully assigned Provisioning Profile to @${app.accountName}/${app.projectName} (${app.bundleIdentifier})`));
}

function formatProvisioningProfileFromApple(appleInfo) {
  var _appleInfo$name;

  const {
    expires,
    provisioningProfileId
  } = appleInfo;
  const id = provisioningProfileId !== null && provisioningProfileId !== void 0 ? provisioningProfileId : '-----';
  const name = (_appleInfo$name = appleInfo.name) !== null && _appleInfo$name !== void 0 ? _appleInfo$name : '-----';
  const expireString = expires ? new Date(expires * 1000).toDateString() : 'unknown';

  const details = _chalk().default.green(`\n    Name: ${name}\n    Expiry: ${expireString}`);

  return `Provisioning Profile - ID: ${id}${details}`;
}

async function getProvisioningProfileFromParams(provisioningProfilePath) {
  if (!provisioningProfilePath) {
    return null;
  }

  const provisioningProfile = await _fsExtra().default.readFile(provisioningProfilePath, 'base64');
  const team = provisioningProfileUtils().readAppleTeam(provisioningProfile);
  return {
    provisioningProfile,
    ...team
  };
}

async function useProvisioningProfileFromParams(ctx, app, provisioningProfile) {
  const distCert = await ctx.ios.getDistCert(app);
  (0, _assert().default)(distCert, 'missing distribution certificate');
  const isValid = await validateProfileWithoutApple(provisioningProfile, distCert, app.bundleIdentifier);

  if (!isValid) {
    throw new Error('Specified invalid Provisioning Profile');
  }

  return await ctx.ios.updateProvisioningProfile(app, provisioningProfile);
}
//# sourceMappingURL=IosProvisioningProfile.js.map