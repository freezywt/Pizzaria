"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ANONYMOUS_USERNAME = void 0;
exports.exportAppAsync = exportAppAsync;

function _config() {
  const data = require("@expo/config");

  _config = function () {
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

function _hashids() {
  const data = _interopRequireDefault(require("hashids"));

  _hashids = function () {
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

function _uuid() {
  const data = require("uuid");

  _uuid = function () {
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

function _writeContents() {
  const data = require("./writeContents");

  _writeContents = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ANONYMOUS_USERNAME = 'anonymous';
/**
 * If the `experimentalBundle` flag is true, the structure of the outputDir will be:
 *
 * ```
 * ├── assets
 * │   └── *
 * ├── bundles
 * │   ├── android-01ee6e3ab3e8c16a4d926c91808d5320.js
 * │   └── ios-ee8206cc754d3f7aa9123b7f909d94ea.js
 * └── metadata.json
 * ```
 *
 * If the `experimentalBundle` flag is not true, then this function is for self hosting
 * and the outputDir will have the files created in the project directory the following way:
 *
 * ```
 * ├── android-index.json
 * ├── ios-index.json
 * ├── assets
 * │   └── 1eccbc4c41d49fd81840aef3eaabe862
 * └── bundles
 *       ├── android-01ee6e3ab3e8c16a4d926c91808d5320.js
 *       └── ios-ee8206cc754d3f7aa9123b7f909d94ea.js
 * ```
 */

exports.ANONYMOUS_USERNAME = ANONYMOUS_USERNAME;

async function exportAppAsync(projectRoot, publicUrl, assetUrl, outputDir, options, experimentalBundle) {
  var _options$publishOptio, _options$publishOptio2;

  const {
    exp,
    pkg,
    hooks
  } = await _xdl().Project.getPublishExpConfigAsync(projectRoot, options.publishOptions);

  const absoluteOutputDir = _path().default.resolve(projectRoot, outputDir);

  const defaultTarget = (0, _config().getDefaultTarget)(projectRoot, exp);
  const target = (_options$publishOptio = (_options$publishOptio2 = options.publishOptions) === null || _options$publishOptio2 === void 0 ? void 0 : _options$publishOptio2.target) !== null && _options$publishOptio !== void 0 ? _options$publishOptio : defaultTarget;

  const assetPathToWrite = _path().default.resolve(absoluteOutputDir, 'assets');

  const bundlesPathToWrite = _path().default.resolve(absoluteOutputDir, 'bundles');

  await Promise.all([_fsExtra().default.ensureDir(assetPathToWrite), _fsExtra().default.ensureDir(bundlesPathToWrite)]);

  if (_log().default.isDebug) {
    _log().default.newLine();

    _log().default.log('Export Assets:');

    _log().default.log(`- Asset target: ${target}`);

    _log().default.newLine();
  } // Run metro bundler and create the JS bundles/source maps.


  const bundles = await _xdl().Project.createBundlesAsync(projectRoot, options.publishOptions, {
    platforms: options.platforms,
    dev: options.isDev,
    useDevServer: _xdl().Env.shouldUseDevServer(exp) // TODO: Disable source map generation if we aren't outputting them.

  }); // Log bundle size info to the user

  (0, _xdl().printBundleSizes)(bundles); // Write the JS bundles to disk, and get the bundle file names (this could change with async chunk loading support).

  const {
    hashes,
    fileNames
  } = await (0, _writeContents().writeBundlesAsync)({
    bundles,
    outputDir: bundlesPathToWrite
  });

  _log().default.log('Finished saving JS Bundles');

  const {
    assets
  } = await _xdl().ProjectAssets.exportAssetsAsync({
    projectRoot,
    exp,
    hostedUrl: publicUrl,
    assetPath: 'assets',
    outputDir: absoluteOutputDir,
    bundles,
    experimentalBundle
  });

  if (options.dumpAssetmap) {
    _log().default.log('Dumping asset map');

    await (0, _writeContents().writeAssetMapAsync)({
      outputDir: absoluteOutputDir,
      assets
    });
  } // build source maps


  if (options.dumpSourcemap) {
    // TODO: Maybe move this into the bundler settings.
    const removeOriginalSourceMappingUrl = target === 'managed' && !!exp.sdkVersion && _semver().default.lt(exp.sdkVersion, '40.0.0');

    await (0, _writeContents().writeSourceMapsAsync)({
      bundles,
      hashes,
      outputDir: bundlesPathToWrite,
      fileNames,
      removeOriginalSourceMappingUrl
    }); // If we output source maps, then add a debug HTML file which the user can open in
    // the web browser to inspect the output like web.

    await (0, _writeContents().writeDebugHtmlAsync)({
      outputDir: absoluteOutputDir,
      fileNames
    });
  } // Skip the hooks and manifest creation if building for EAS.


  if (experimentalBundle) {
    // Generate a metadata.json and bail.
    await (0, _writeContents().writeMetadataJsonAsync)({
      outputDir,
      bundles,
      fileNames
    });
    return;
  } // Load the "post export" hooks


  const validPostExportHooks = _xdl().Project.prepareHooks(hooks, 'postExport', projectRoot); // Append server values to the Expo config.


  mutateExpoConfigWithManifestValues(exp, {
    assetUrl,
    isDev: options.isDev,
    username: await _xdl().UserManager.getCurrentUsernameAsync()
  }); // TODO: Add a comment explaining what platform manifests are used for

  const manifests = await (0, _writeContents().writePlatformManifestsAsync)({
    outputDir: absoluteOutputDir,
    publicUrl,
    fileNames,
    exp,
    pkg
  }); // Create the shared bundle info object in somewhat of a legacy format.

  const bundleInfo = (0, _writeContents().createMultiPlatformBundleInfo)({
    bundles,
    manifests,
    publicUrl
  }); // Run post export hooks for users who want to do things like uploading source maps to sentry.

  runHooks({
    projectRoot,
    exp,
    hooks: validPostExportHooks,
    info: bundleInfo
  }); // configure embedded assets for expo-updates or ExpoKit

  await _xdl().EmbeddedAssets.configureAsync({ ...bundleInfo,
    projectRoot,
    exp,
    pkg,
    target
  });
}

function runHooks({
  projectRoot,
  exp,
  hooks,
  info
}) {
  const hookOptions = {
    url: null,
    ...info,
    projectRoot,
    exp,
    log: _log().default.info
  };

  for (const hook of hooks) {
    _log().default.log(`Running postExport hook: ${hook.file}`);

    try {
      _xdl().Project.runHook(hook, hookOptions);
    } catch (e) {
      _log().default.warn(`Warning: postExport hook '${hook.file}' failed: ${e.stack}`);
    }
  }
} // TODO: Move to expo/config for public manifests


function mutateExpoConfigWithManifestValues(exp, {
  assetUrl,
  isDev,
  username
}) {
  // Add assetUrl to manifest
  exp.assetUrlOverride = assetUrl;
  exp.publishedTime = new Date().toISOString();
  exp.commitTime = new Date().toISOString();
  exp.releaseId = (0, _uuid().v4)(); // generate revisionId and id the same way www does

  const hashIds = new (_hashids().default)((0, _uuid().v1)(), 10);
  exp.revisionId = hashIds.encode(Date.now());

  if (isDev) {
    exp.developer = {
      tool: 'exp'
    };
  }

  if (!username) {
    username = ANONYMOUS_USERNAME;
  }

  exp.id = `@${username}/${exp.slug}`;
  return exp;
}
//# sourceMappingURL=exportAppAsync.js.map