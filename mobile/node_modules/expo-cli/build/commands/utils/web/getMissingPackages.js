"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectMissingPackages = collectMissingPackages;
exports.getMissingPackagesAsync = getMissingPackagesAsync;
exports.mutatePackagesWithKnownVersionsAsync = mutatePackagesWithKnownVersionsAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function collectMissingPackages(projectRoot, requiredPackages) {
  const resolutions = {};
  const missingPackages = requiredPackages.filter(p => {
    try {
      const resolved = (0, _resolveFrom().default)(projectRoot, p.file);

      if (resolved) {
        resolutions[p.pkg] = resolved;
      }

      return !resolved;
    } catch {
      return true;
    }
  });
  return {
    missing: missingPackages,
    resolutions
  };
}
/**
 * Collect missing packages given a list of required packages.
 * Any missing packages will be versioned to the known versions for the current SDK.
 *
 * @param projectRoot
 * @param props.requiredPackages list of required packages to check for
 * @returns list of missing packages and resolutions to existing packages.
 */


async function getMissingPackagesAsync(projectRoot, {
  exp = (0, _config().getConfig)(projectRoot, {
    skipSDKVersionRequirement: true
  }).exp,
  requiredPackages
}) {
  const results = collectMissingPackages(projectRoot, requiredPackages);

  if (!results.missing.length) {
    return results;
  } // Ensure the versions are right for the SDK that the project is currently using.


  await mutatePackagesWithKnownVersionsAsync(exp, results.missing);
  return results;
}

async function getSDKVersionsAsync(exp) {
  try {
    if (exp.sdkVersion) {
      var _sdkVersions$exp$sdkV;

      const sdkVersions = await _xdl().Versions.releasedSdkVersionsAsync();
      return (_sdkVersions$exp$sdkV = sdkVersions[exp.sdkVersion]) !== null && _sdkVersions$exp$sdkV !== void 0 ? _sdkVersions$exp$sdkV : null;
    }
  } catch {// This is a convenience method and we should avoid making this halt the process.
  }

  return null;
}

async function mutatePackagesWithKnownVersionsAsync(exp, packages) {
  // Ensure the versions are right for the SDK that the project is currently using.
  const versions = await getSDKVersionsAsync(exp);

  if (versions !== null && versions !== void 0 && versions.relatedPackages) {
    for (const pkg of packages) {
      if (pkg.pkg in versions.relatedPackages) {
        pkg.version = versions.relatedPackages[pkg.pkg];
      }
    }
  }

  return packages;
}
//# sourceMappingURL=getMissingPackages.js.map