"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProvisioningProfileManager = exports.ProfileClass = void 0;

function _appleUtils() {
  const data = require("@expo/apple-utils");

  _appleUtils = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = require("../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _authenticate() {
  const data = require("./authenticate");

  _authenticate = function () {
    return data;
  };

  return data;
}

function _bundleId() {
  const data = require("./bundleId");

  _bundleId = function () {
    return data;
  };

  return data;
}

function _distributionCert() {
  const data = require("./distributionCert");

  _distributionCert = function () {
    return data;
  };

  return data;
}

function _p12Certificate() {
  const data = require("./p12Certificate");

  _p12Certificate = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ProfileClass;
exports.ProfileClass = ProfileClass;

(function (ProfileClass) {
  ProfileClass["Adhoc"] = "ad_hoc";
  ProfileClass["General"] = "general";
})(ProfileClass || (exports.ProfileClass = ProfileClass = {}));

function resolveProfileType(profileClass, isEnterprise) {
  if (isEnterprise) {
    return profileClass === ProfileClass.Adhoc ? _appleUtils().ProfileType.IOS_APP_ADHOC : _appleUtils().ProfileType.IOS_APP_INHOUSE;
  } else {
    return profileClass === ProfileClass.Adhoc ? _appleUtils().ProfileType.IOS_APP_ADHOC : _appleUtils().ProfileType.IOS_APP_STORE;
  }
}

async function transformProfileAsync(cert, authCtx) {
  return {
    provisioningProfileId: cert.id,
    name: cert.attributes.name,
    status: cert.attributes.profileState,
    expires: new Date(cert.attributes.expirationDate).getTime() / 1000,
    distributionMethod: cert.attributes.profileType,
    // @ts-ignore -- this can be null when the profile has expired.
    provisioningProfile: cert.attributes.profileContent,
    certificates: (await cert.getCertificatesAsync()).map(_distributionCert().transformCertificate),
    teamId: authCtx.team.id,
    teamName: authCtx.team.name
  };
}

async function addCertificateToProfileAsync(context, {
  serialNumber,
  profileId,
  bundleIdentifier
}) {
  const cert = await (0, _distributionCert().getCertificateBySerialNumberAsync)(context, serialNumber);
  const profiles = await (0, _bundleId().getProfilesForBundleIdAsync)(context, bundleIdentifier);
  const profile = profiles.find(profile => profile.id === profileId);

  if (!profile) {
    throw new (_CommandError().default)(`Failed to find profile for bundle identifier "${bundleIdentifier}" with profile id "${profileId}"`);
  } // Assign the new certificate


  profile.attributes.certificates = [cert];
  return await profile.regenerateAsync();
}

async function useExistingProvisioningProfileAsync(authCtx, bundleIdentifier, provisioningProfile, distCert) {
  if (!provisioningProfile.provisioningProfileId) {
    throw new (_CommandError().default)('Provisioning profile: cannot use existing profile, insufficient id');
  }

  const certIdTag = distCert.certId ? ` (${distCert.certId})` : '';
  const spinner = (0, _ora().ora)(`Updating provisioning profile (${provisioningProfile.provisioningProfileId}) with distribution certificate${certIdTag}`).start();

  try {
    if (!distCert.distCertSerialNumber) {
      distCert.distCertSerialNumber = (0, _p12Certificate().findP12CertSerialNumber)(distCert.certP12, distCert.certPassword);
    }

    const context = (0, _authenticate().getRequestContext)(authCtx);
    const profile = await addCertificateToProfileAsync(context, {
      serialNumber: distCert.distCertSerialNumber,
      profileId: provisioningProfile.provisioningProfileId,
      bundleIdentifier
    });
    const content = profile.attributes.profileContent;

    if (!content) {
      // this should never happen because of the regen.
      throw new (_CommandError().default)(`Provisioning profile "${profile.attributes.name}" (${profile.id}) is expired!`);
    }

    const result = {
      provisioningProfileId: profile.id,
      provisioningProfile: content,
      teamId: authCtx.team.id,
      teamName: authCtx.team.name
    };
    spinner.succeed(`Updated provisioning profile (${profile.id}) with distribution certificate${certIdTag}`);
    return { ...result,
      teamId: authCtx.team.id,
      teamName: authCtx.team.name
    };
  } catch (error) {
    spinner.fail(`Failed to update provisioning profile (${provisioningProfile.provisioningProfileId}) with distribution certificate${certIdTag}`);
    throw error;
  }
}

async function listProvisioningProfilesAsync(authCtx, bundleIdentifier, profileClass = ProfileClass.General) {
  const spinner = (0, _ora().ora)(`Fetching Apple provisioning profiles`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const profileType = resolveProfileType(profileClass, authCtx.team.inHouse);
    const profiles = (await (0, _bundleId().getProfilesForBundleIdAsync)(context, bundleIdentifier)).filter(profile => profile.attributes.profileType === profileType);
    const result = await Promise.all(profiles.map(profile => transformProfileAsync(profile, authCtx)));
    spinner.succeed(`Fetched Apple provisioning profiles`);
    return result;
  } catch (error) {
    spinner.fail(`Failed to fetch Apple provisioning profiles`);
    throw error;
  }
}

async function createProvisioningProfileAsync(authCtx, bundleIdentifier, distCert, profileName, profileClass = ProfileClass.General) {
  const spinner = (0, _ora().ora)(`Creating Apple provisioning profile`).start();

  try {
    if (!distCert.distCertSerialNumber) {
      distCert.distCertSerialNumber = (0, _p12Certificate().findP12CertSerialNumber)(distCert.certP12, distCert.certPassword);
    }

    const context = (0, _authenticate().getRequestContext)(authCtx);
    const profileType = resolveProfileType(profileClass, authCtx.team.inHouse);
    const certificate = await (0, _distributionCert().getCertificateBySerialNumberAsync)(context, distCert.distCertSerialNumber);
    const bundleIdItem = await (0, _bundleId().getBundleIdForIdentifierAsync)(context, bundleIdentifier);
    const profile = await _appleUtils().Profile.createAsync(context, {
      bundleId: bundleIdItem.id,
      name: profileName,
      certificates: [certificate.id],
      devices: [],
      profileType
    });
    const result = await transformProfileAsync(profile, authCtx);
    spinner.succeed('Created Apple provisioning profile');
    return result;
  } catch (error) {
    spinner.fail('Failed to create Apple provisioning profile');
    throw error;
  }
}

async function revokeProvisioningProfileAsync(authCtx, bundleIdentifier, profileClass = ProfileClass.General) {
  const spinner = (0, _ora().ora)(`Revoking Apple provisioning profile`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const profiles = await (0, _bundleId().getProfilesForBundleIdAsync)(context, bundleIdentifier);
    const profileType = resolveProfileType(profileClass, authCtx.team.inHouse);
    await Promise.all(profiles.filter(profile => profile.attributes.profileType === profileType).map(profile => _appleUtils().Profile.deleteAsync(context, {
      id: profile.id
    })));
    spinner.succeed('Revoked Apple provisioning profile');
  } catch (error) {
    spinner.fail('Failed to revoke Apple provisioning profile');
    throw error;
  }
}

class ProvisioningProfileManager {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async useExisting(bundleIdentifier, provisioningProfile, distCert) {
    return useExistingProvisioningProfileAsync(this.ctx, bundleIdentifier, provisioningProfile, distCert);
  }

  async list(bundleIdentifier) {
    return listProvisioningProfilesAsync(this.ctx, bundleIdentifier);
  }

  async create(bundleIdentifier, distCert, profileName) {
    return createProvisioningProfileAsync(this.ctx, bundleIdentifier, distCert, profileName);
  }

  async revoke(bundleIdentifier) {
    return revokeProvisioningProfileAsync(this.ctx, bundleIdentifier);
  }

}

exports.ProvisioningProfileManager = ProvisioningProfileManager;
//# sourceMappingURL=provisioningProfile.js.map