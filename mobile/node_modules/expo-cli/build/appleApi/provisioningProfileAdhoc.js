"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProvisioningProfileAdhocManager = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uniqueItems(items) {
  const set = new Set(items);
  return [...set];
}

async function registerMissingDevicesAsync(context, udids) {
  const allIosProfileDevices = await _appleUtils().Device.getAllIOSProfileDevicesAsync(context);
  const alreadyAdded = allIosProfileDevices.filter(device => udids.includes(device.attributes.udid));
  const alreadyAddedUdids = alreadyAdded.map(i => i.attributes.udid);
  await Promise.all(udids.map(async udid => {
    if (!alreadyAddedUdids.includes(udid)) {
      const device = await _appleUtils().Device.createAsync(context, {
        name: 'iOS Device (added by Expo)',
        udid
      });
      alreadyAdded.push(device);
    }
  }));
  return alreadyAdded;
}

async function findProfileByBundleIdAsync(context, bundleId, certSerialNumber) {
  const expoProfiles = (await (0, _bundleId().getProfilesForBundleIdAsync)(context, bundleId)).filter(profile => {
    return profile.attributes.profileType === _appleUtils().ProfileType.IOS_APP_ADHOC && profile.attributes.name.startsWith('*[expo]') && profile.attributes.profileState !== _appleUtils().ProfileState.EXPIRED;
  });
  const expoProfilesWithCertificate = []; // find profiles associated with our development cert

  for (const profile of expoProfiles) {
    const certificates = await profile.getCertificatesAsync();

    if (certificates.some(cert => cert.attributes.serialNumber === certSerialNumber)) {
      expoProfilesWithCertificate.push(profile);
    }
  }

  if (expoProfilesWithCertificate) {
    // there is an expo managed profile with our desired certificate
    // return the profile that will be valid for the longest duration
    return {
      profile: expoProfilesWithCertificate.sort(sortByExpiration)[expoProfilesWithCertificate.length - 1],
      didUpdate: false
    };
  } else if (expoProfiles) {
    // there is an expo managed profile, but it doesn't have our desired certificate
    // append the certificate and update the profile
    const distributionCertificate = await (0, _distributionCert().getDistributionCertificateAync)(context, certSerialNumber);

    if (!distributionCertificate) {
      throw new (_CommandError().default)(`Certificate for serial number "${certSerialNumber}" does not exist`);
    }

    const profile = expoProfiles.sort(sortByExpiration)[expoProfiles.length - 1];
    profile.attributes.certificates = [distributionCertificate];
    return {
      profile: await profile.regenerateAsync(),
      didUpdate: true
    };
  } // there is no valid provisioning profile available


  return {
    profile: null,
    didUpdate: false
  };
}

function sortByExpiration(a, b) {
  return new Date(a.attributes.expirationDate).getTime() - new Date(b.attributes.expirationDate).getTime();
}

async function findProfileByIdAsync(context, profileId, bundleId) {
  var _profiles$find;

  let profiles = await (0, _bundleId().getProfilesForBundleIdAsync)(context, bundleId);
  profiles = profiles.filter(profile => profile.attributes.profileType === _appleUtils().ProfileType.IOS_APP_ADHOC);
  return (_profiles$find = profiles.find(profile => profile.id === profileId)) !== null && _profiles$find !== void 0 ? _profiles$find : null;
}

async function manageAdHocProfilesAsync(context, {
  udids,
  bundleId,
  certSerialNumber,
  profileId
}) {
  // We register all missing devices on the Apple Developer Portal. They are identified by UDIDs.
  const devices = await registerMissingDevicesAsync(context, udids);
  let existingProfile;
  let didUpdate = false;

  if (profileId) {
    existingProfile = await findProfileByIdAsync(context, profileId, bundleId); // Fail if we cannot find the profile that was specifically requested

    if (!existingProfile) throw new (_CommandError().default)(`Could not find profile with profile id "${profileId}" for bundle id "${bundleId}"`);
  } else {
    // If no profile id is passed, try to find a suitable provisioning profile for the App ID.
    const results = await findProfileByBundleIdAsync(context, bundleId, certSerialNumber);
    existingProfile = results.profile;
    didUpdate = results.didUpdate;
  }

  if (existingProfile) {
    var _existingProfile$attr, _existingProfile, _existingProfile$attr2, _existingProfile$attr3, _existingProfile$attr4;

    // We need to verify whether the existing profile includes all user's devices.
    let deviceUdidsInProfile = (_existingProfile$attr = (_existingProfile = existingProfile) === null || _existingProfile === void 0 ? void 0 : (_existingProfile$attr2 = _existingProfile.attributes) === null || _existingProfile$attr2 === void 0 ? void 0 : (_existingProfile$attr3 = _existingProfile$attr2.devices) === null || _existingProfile$attr3 === void 0 ? void 0 : (_existingProfile$attr4 = _existingProfile$attr3.map) === null || _existingProfile$attr4 === void 0 ? void 0 : _existingProfile$attr4.call(_existingProfile$attr3, i => i.attributes.udid)) !== null && _existingProfile$attr !== void 0 ? _existingProfile$attr : [];
    deviceUdidsInProfile = uniqueItems(deviceUdidsInProfile.filter(Boolean));
    const allDeviceUdids = uniqueItems(udids);
    const hasEqualUdids = deviceUdidsInProfile.length === allDeviceUdids.length && deviceUdidsInProfile.every(udid => allDeviceUdids.includes(udid));

    if (hasEqualUdids && existingProfile.isValid()) {
      var _existingProfile2, _existingProfile2$att, _existingProfile3, _existingProfile4;

      const result = {
        profileName: (_existingProfile2 = existingProfile) === null || _existingProfile2 === void 0 ? void 0 : (_existingProfile2$att = _existingProfile2.attributes) === null || _existingProfile2$att === void 0 ? void 0 : _existingProfile2$att.name,
        provisioningProfileId: (_existingProfile3 = existingProfile) === null || _existingProfile3 === void 0 ? void 0 : _existingProfile3.id,
        provisioningProfile: (_existingProfile4 = existingProfile) === null || _existingProfile4 === void 0 ? void 0 : _existingProfile4.attributes.profileContent
      };

      if (didUpdate) {
        result.didUpdate = true;
      }

      return result;
    } // We need to add new devices to the list and create a new provisioning profile.


    existingProfile.attributes.devices = devices;
    await existingProfile.regenerateAsync();
    const updatedProfile = (await findProfileByBundleIdAsync(context, bundleId, certSerialNumber)).profile;

    if (!updatedProfile) {
      throw new (_CommandError().default)(`Failed to locate updated profile for bundle identifier "${bundleId}" and serial number "${certSerialNumber}"`);
    }

    return {
      didUpdate: true,
      profileName: updatedProfile.attributes.name,
      provisioningProfileId: updatedProfile.id,
      provisioningProfile: updatedProfile.attributes.profileContent
    };
  } // No existing profile...
  // We need to find user's distribution certificate to make a provisioning profile for it.


  const distributionCertificate = await (0, _distributionCert().getDistributionCertificateAync)(context, certSerialNumber);

  if (!distributionCertificate) {
    // If the distribution certificate doesn't exist, the user must have deleted it, we can't do anything here :(
    throw new (_CommandError().default)(`No distribution certificate for serial number "${certSerialNumber}" is available to make a provisioning profile against`);
  }

  const bundleIdItem = await (0, _bundleId().getBundleIdForIdentifierAsync)(context, bundleId); // If the provisioning profile for the App ID doesn't exist, we just need to create a new one!

  const newProfile = await _appleUtils().Profile.createAsync(context, {
    bundleId: bundleIdItem.id,
    // apple drops [ if its the first char (!!),
    name: `*[expo] ${bundleId} AdHoc ${Date.now()}`,
    certificates: [distributionCertificate.id],
    devices: devices.map(device => device.id),
    profileType: _appleUtils().ProfileType.IOS_APP_ADHOC
  });
  return {
    didUpdate: true,
    didCreate: true,
    profileName: newProfile.attributes.name,
    provisioningProfileId: newProfile.id,
    provisioningProfile: newProfile.attributes.profileContent
  };
}

async function createOrReuseAdhocProvisioningProfileAsync(authCtx, udids, bundleIdentifier, distCertSerialNumber) {
  const spinner = (0, _ora().ora)(`Handling Apple ad hoc provisioning profiles`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const {
      didUpdate,
      didCreate,
      profileName,
      ...adhocProvisioningProfile
    } = await manageAdHocProfilesAsync(context, {
      udids,
      bundleId: bundleIdentifier,
      certSerialNumber: distCertSerialNumber
    });

    if (didCreate) {
      spinner.succeed(`Created new profile: ${profileName}`);
    } else if (didUpdate) {
      spinner.succeed(`Updated existing profile: ${profileName}`);
    } else {
      spinner.succeed(`Used existing profile: ${profileName}`);
    }

    return { ...adhocProvisioningProfile,
      teamId: authCtx.team.id,
      teamName: authCtx.team.name
    };
  } catch (error) {
    spinner.fail(`Failed to handle Apple profiles`);
    throw error;
  }
}

class ProvisioningProfileAdhocManager {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async createOrReuse(udids, bundleIdentifier, distCertSerialNumber) {
    return createOrReuseAdhocProvisioningProfileAsync(this.ctx, udids, bundleIdentifier, distCertSerialNumber);
  }

}

exports.ProvisioningProfileAdhocManager = ProvisioningProfileAdhocManager;
//# sourceMappingURL=provisioningProfileAdhoc.js.map