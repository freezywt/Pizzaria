"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMultiPlatformBundleInfo = createMultiPlatformBundleInfo;
exports.writeAssetMapAsync = writeAssetMapAsync;
exports.writeBundlesAsync = writeBundlesAsync;
exports.writeDebugHtmlAsync = writeDebugHtmlAsync;
exports.writeMetadataJsonAsync = writeMetadataJsonAsync;
exports.writePlatformManifestsAsync = writePlatformManifestsAsync;
exports.writeSourceMapsAsync = writeSourceMapsAsync;

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = require("fs-extra");

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

function _urlJoin() {
  const data = _interopRequireDefault(require("url-join"));

  _urlJoin = function () {
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

function _truncateLastLinesAsync() {
  const data = require("../utils/truncateLastLinesAsync");

  _truncateLastLinesAsync = function () {
    return data;
  };

  return data;
}

function _createMetadataJson() {
  const data = require("./createMetadataJson");

  _createMetadataJson = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function writeAsync(folder, fileName, contents) {
  await (0, _fsExtra().ensureDir)(folder);
  await _fs().default.promises.writeFile(_path().default.join(folder, fileName), contents);
}

async function writeDebugHtmlAsync({
  outputDir,
  fileNames
}) {
  // Make a debug html so user can debug their bundles
  _log().default.log('Preparing additional debugging files');

  const debugHtml = `
      ${Object.values(fileNames).map(fileName => `<script src="${_path().default.join('bundles', fileName)}"></script>`).join('\n      ')}
      Open up this file in Chrome. In the JavaScript developer console, navigate to the Source tab.
      You can see a red colored folder containing the original source code from your bundle.
      `;
  await writeAsync(outputDir, 'debug.html', debugHtml);
}
/**
 * @param props.platform native platform for the bundle
 * @param props.hash crypto hash for the bundle contents
 * @returns filename for the JS bundle.
 */


function createBundleFileName({
  platform,
  hash
}) {
  return `${platform}-${hash}.js`;
}
/**
 * @param bundle JS bundle as a string
 * @returns crypto hash for the provided bundle
 */


function createBundleHash(bundle) {
  return _crypto().default.createHash('md5').update(bundle).digest('hex');
}

async function writeBundlesAsync({
  bundles,
  outputDir
}) {
  const hashes = {};
  const fileNames = {};

  for (const [platform, bundleOutput] of Object.entries(bundles)) {
    var _bundleOutput$hermesB;

    const bundle = (_bundleOutput$hermesB = bundleOutput.hermesBytecodeBundle) !== null && _bundleOutput$hermesB !== void 0 ? _bundleOutput$hermesB : bundleOutput.code;
    const hash = createBundleHash(bundle);
    const fileName = createBundleFileName({
      platform,
      hash
    });
    hashes[platform] = hash;
    fileNames[platform] = fileName;
    await writeAsync(outputDir, fileName, bundle);
  }

  return {
    hashes,
    fileNames
  };
}

async function writeSourceMapsAsync({
  bundles,
  hashes,
  fileNames,
  outputDir,
  removeOriginalSourceMappingUrl
}) {
  return await Promise.all(Object.entries(bundles).map(async ([platform, bundle]) => {
    var _bundle$hermesSourcem, _hashes$platform, _bundle$hermesBytecod, _fileNames$platform;

    const sourceMap = (_bundle$hermesSourcem = bundle.hermesSourcemap) !== null && _bundle$hermesSourcem !== void 0 ? _bundle$hermesSourcem : bundle.map;
    const hash = (_hashes$platform = hashes === null || hashes === void 0 ? void 0 : hashes[platform]) !== null && _hashes$platform !== void 0 ? _hashes$platform : createBundleHash((_bundle$hermesBytecod = bundle.hermesBytecodeBundle) !== null && _bundle$hermesBytecod !== void 0 ? _bundle$hermesBytecod : bundle.code);
    const mapName = `${platform}-${hash}.map`;
    await writeAsync(outputDir, mapName, sourceMap);
    const jsBundleFileName = (_fileNames$platform = fileNames === null || fileNames === void 0 ? void 0 : fileNames[platform]) !== null && _fileNames$platform !== void 0 ? _fileNames$platform : createBundleFileName({
      platform,
      hash
    });

    const jsPath = _path().default.join(outputDir, jsBundleFileName);

    if (removeOriginalSourceMappingUrl) {
      // Remove original mapping to incorrect sourcemap paths
      // In SDK 40+ and bare projects, we no longer need to do this.
      _log().default.log(`Configuring source maps for ${platform}`);

      await (0, _truncateLastLinesAsync().truncateLastLinesAsync)(jsPath, 1);
    } // Add correct mapping to sourcemap paths


    const mappingComment = `\n//# sourceMappingURL=${mapName}`;
    await _fs().default.promises.appendFile(jsPath, mappingComment);
    return {
      platform,
      fileName: mapName,
      hash,
      map: sourceMap,
      comment: mappingComment
    };
  }));
}

async function writeMetadataJsonAsync({
  outputDir,
  bundles,
  fileNames
}) {
  const metadata = (0, _createMetadataJson().createMetadataJson)({
    bundles,
    fileNames
  });
  await writeAsync(outputDir, 'metadata.json', JSON.stringify(metadata));
}

async function writeAssetMapAsync({
  outputDir,
  assets
}) {
  // Convert the assets array to a k/v pair where the asset hash is the key and the asset is the value.
  const contents = Object.fromEntries(assets.map(asset => [asset.hash, asset]));
  await writeAsync(outputDir, 'assetmap.json', JSON.stringify(contents));
  return contents;
}

async function writePlatformManifestsAsync({
  outputDir,
  publicUrl,
  fileNames,
  exp,
  pkg
}) {
  var _pkg$dependencies;

  const dependencies = Object.keys((_pkg$dependencies = pkg.dependencies) !== null && _pkg$dependencies !== void 0 ? _pkg$dependencies : {});
  const manifests = {};

  for (const platform of Object.keys(fileNames)) {
    // save the platform manifest
    const manifest = { ...exp,
      platform,
      bundleUrl: (0, _urlJoin().default)(publicUrl, 'bundles', fileNames[platform]),
      dependencies
    };
    manifests[platform] = manifest;
    await writeAsync(outputDir, `${platform}-index.json`, JSON.stringify(manifest));
  }

  return manifests;
} // TODO: Refactor this to support more/less platforms better.


function createMultiPlatformBundleInfo({
  publicUrl,
  bundles,
  manifests
}) {
  const keys = [{
    key: 'ManifestUrl',
    on: platform => (0, _urlJoin().default)(publicUrl, `${platform}-index.json`)
  }, {
    key: 'Manifest',
    on: platform => {
      var _manifests$platform;

      return (_manifests$platform = manifests[platform]) !== null && _manifests$platform !== void 0 ? _manifests$platform : null;
    }
  }, {
    key: 'Bundle',
    on: platform => {
      var _bundles$platform$her;

      return (_bundles$platform$her = bundles[platform].hermesBytecodeBundle) !== null && _bundles$platform$her !== void 0 ? _bundles$platform$her : bundles[platform].code;
    }
  }, {
    key: 'SourceMap',
    on: platform => {
      var _bundles$platform$her2;

      return (_bundles$platform$her2 = bundles[platform].hermesSourcemap) !== null && _bundles$platform$her2 !== void 0 ? _bundles$platform$her2 : bundles[platform].map;
    }
  }];
  return keys.reduce((prev, cur) => {
    for (const platform of Object.keys(bundles)) {
      // Like `iosManifestUrl`, or `androidBundle`
      const configKey = platform + cur.key; // @ts-ignore: needs refactor in the future -- currently a refactor would break the public API for publish hooks.

      prev[configKey] = cur.on(platform);
    }

    return prev;
  }, {});
}
//# sourceMappingURL=writeContents.js.map