"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAppDistributions = mergeAppDistributions;

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isSelfHostedIndex(obj) {
  return !!obj.sdkVersion;
} // Takes multiple exported apps in sourceDirs and coalesces them to one app in outputDir


async function mergeAppDistributions(projectRoot, sourceDirs, outputDir) {
  const assetPathToWrite = _path().default.resolve(projectRoot, outputDir, 'assets');

  await _fsExtra().default.ensureDir(assetPathToWrite);

  const bundlesPathToWrite = _path().default.resolve(projectRoot, outputDir, 'bundles');

  await _fsExtra().default.ensureDir(bundlesPathToWrite); // merge files from bundles and assets

  const androidIndexes = [];
  const iosIndexes = [];

  for (const sourceDir of sourceDirs) {
    const promises = []; // copy over assets/bundles from other src dirs to the output dir

    if (sourceDir !== outputDir) {
      // copy file over to assetPath
      const sourceAssetDir = _path().default.resolve(projectRoot, sourceDir, 'assets');

      const outputAssetDir = _path().default.resolve(projectRoot, outputDir, 'assets');

      const assetPromise = _fsExtra().default.copy(sourceAssetDir, outputAssetDir);

      promises.push(assetPromise); // copy files over to bundlePath

      const sourceBundleDir = _path().default.resolve(projectRoot, sourceDir, 'bundles');

      const outputBundleDir = _path().default.resolve(projectRoot, outputDir, 'bundles');

      const bundlePromise = _fsExtra().default.copy(sourceBundleDir, outputBundleDir);

      promises.push(bundlePromise);
      await Promise.all(promises);
    } // put index.jsons into memory


    const putJsonInMemory = async (indexPath, accumulator) => {
      const index = await _jsonFile().default.readAsync(indexPath);

      if (!isSelfHostedIndex(index)) {
        throw new (_xdl().XDLError)('INVALID_MANIFEST', `Invalid index.json, must specify an sdkVersion at ${indexPath}`);
      }

      if (Array.isArray(index)) {
        // index.json could also be an array
        accumulator.push(...index);
      } else {
        accumulator.push(index);
      }
    };

    const androidIndexPath = _path().default.resolve(projectRoot, sourceDir, 'android-index.json');

    await putJsonInMemory(androidIndexPath, androidIndexes);

    const iosIndexPath = _path().default.resolve(projectRoot, sourceDir, 'ios-index.json');

    await putJsonInMemory(iosIndexPath, iosIndexes);
  } // sort indexes by descending sdk value


  const getSortedIndex = indexes => {
    return indexes.sort((index1, index2) => {
      if (_semver().default.eq(index1.sdkVersion, index2.sdkVersion)) {
        _log().default.error(`Encountered multiple index.json with the same SDK version ${index1.sdkVersion}. This could result in undefined behavior.`);
      }

      return _semver().default.gte(index1.sdkVersion, index2.sdkVersion) ? -1 : 1;
    });
  };

  const sortedAndroidIndexes = getSortedIndex(androidIndexes);
  const sortedIosIndexes = getSortedIndex(iosIndexes); // Save the json arrays to disk

  await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, _path().default.join(outputDir, 'android-index.json'), JSON.stringify(sortedAndroidIndexes));
  await _xdl().Project.writeArtifactSafelyAsync(projectRoot, null, _path().default.join(outputDir, 'ios-index.json'), JSON.stringify(sortedIosIndexes));
}
//# sourceMappingURL=mergeAppDistributions.js.map