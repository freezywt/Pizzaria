"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBundleIdForIdentifierAsync = getBundleIdForIdentifierAsync;
exports.getProfilesForBundleIdAsync = getProfilesForBundleIdAsync;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getProfilesForBundleIdDangerousAsync(context, bundleIdentifier) {
  const bundleId = await _appleUtils().BundleId.findAsync(context, {
    identifier: bundleIdentifier
  });

  if (bundleId) {
    return bundleId.getProfilesAsync();
  }

  return [];
}

async function getProfilesForBundleIdAsync(context, bundleIdentifier) {
  const profiles = await getProfilesForBundleIdDangerousAsync(context, bundleIdentifier); // users sometimes have a poisoned Apple cache and receive stale data from the API
  // we call an arbitrary method, `getBundleIdAsync` on each profile
  // if it errors, the profile was stale, so we remove it

  const validProfileIds = new Set();
  await Promise.all(profiles.map(async profile => {
    try {
      await profile.getBundleIdAsync();
      validProfileIds.add(profile.id);
    } catch (e) {
      if (e.name === 'UnexpectedAppleResponse' && e.message.includes('The specified resource does not exist - There is no resource of type')) {
        // TODO: add tracking analytics here
        return;
      }

      throw e;
    }
  }));
  return profiles.filter(profile => validProfileIds.has(profile.id));
}

async function getBundleIdForIdentifierAsync(context, bundleIdentifier) {
  const bundleId = await _appleUtils().BundleId.findAsync(context, {
    identifier: bundleIdentifier
  });

  if (!bundleId) {
    throw new (_CommandError().default)(`Failed to find Bundle ID item with identifier "${bundleIdentifier}"`);
  }

  return bundleId;
}
//# sourceMappingURL=bundleId.js.map