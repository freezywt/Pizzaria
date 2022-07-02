"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;
exports.collectMergeSourceUrlsAsync = collectMergeSourceUrlsAsync;
exports.ensurePublicUrlAsync = ensurePublicUrlAsync;
exports.promptPublicUrlAsync = promptPublicUrlAsync;

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function _crypto() {
  const data = _interopRequireDefault(require("crypto"));

  _crypto = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = _interopRequireDefault(require("../../utils/prompts"));

  _prompts = function () {
    return data;
  };

  return data;
}

function _platformOptions() {
  const data = require("../eject/platformOptions");

  _platformOptions = function () {
    return data;
  };

  return data;
}

function CreateApp() {
  const data = _interopRequireWildcard(require("../utils/CreateApp"));

  CreateApp = function () {
    return data;
  };

  return data;
}

function _Tar() {
  const data = require("../utils/Tar");

  _Tar = function () {
    return data;
  };

  return data;
}

function _exportAppAsync() {
  const data = require("./exportAppAsync");

  _exportAppAsync = function () {
    return data;
  };

  return data;
}

function _mergeAppDistributions() {
  const data = require("./mergeAppDistributions");

  _mergeAppDistributions = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function promptPublicUrlAsync() {
  try {
    const {
      value
    } = await (0, _prompts().default)({
      type: 'text',
      name: 'value',
      validate: _xdl().UrlUtils.isHttps,
      message: `What is the public url that will host the static files?`
    });
    return value;
  } catch {
    throw new (_CommandError().default)('MISSING_PUBLIC_URL', 'Missing required option: --public-url');
  }
}

async function ensurePublicUrlAsync(url, isDev) {
  if (!url) {
    if (_commander().default.nonInteractive) {
      throw new (_CommandError().default)('MISSING_PUBLIC_URL', 'Missing required option: --public-url');
    }

    url = await promptPublicUrlAsync();
  } // If we are not in dev mode, ensure that url is https


  if (!isDev && !_xdl().UrlUtils.isHttps(url)) {
    throw new (_CommandError().default)('INVALID_PUBLIC_URL', '--public-url must be a valid HTTPS URL.');
  } else if (!_xdl().UrlUtils.isURL(url, {
    protocols: ['http', 'https']
  })) {
    _log().default.nestedWarn(`Dev Mode: --public-url ${url} does not conform to the required HTTP(S) protocol.`);
  }

  return url;
} // TODO: We shouldn't need to wrap a method that is only used for one purpose.


async function exportFilesAsync(projectRoot, options) {
  const platforms = (0, _platformOptions().platformsFromPlatform)(options.platform, {
    loose: true
  }); // Make outputDir an absolute path if it isnt already

  const exportOptions = {
    dumpAssetmap: options.dumpAssetmap,
    dumpSourcemap: options.dumpSourcemap,
    isDev: options.dev,
    platforms,
    publishOptions: {
      resetCache: !!options.clear,
      target: options.target
    }
  };
  return await (0, _exportAppAsync().exportAppAsync)(projectRoot, options.publicUrl, options.assetUrl, options.outputDir, exportOptions, options.experimentalBundle);
}

async function mergeSourceDirectoriresAsync(projectRoot, mergeSrcDirs, options) {
  if (!mergeSrcDirs.length) {
    return;
  }

  const srcDirs = options.mergeSrcDir.concat(options.mergeSrcUrl).join(' ');

  _log().default.nested(`Starting project merge of ${srcDirs} into ${options.outputDir}`); // Merge app distributions


  await (0, _mergeAppDistributions().mergeAppDistributions)(projectRoot, [...mergeSrcDirs, options.outputDir], // merge stuff in srcDirs and outputDir together
  options.outputDir);

  _log().default.nested(`Project merge was successful. Your merged files can be found in ${options.outputDir}`);
}

async function collectMergeSourceUrlsAsync(projectRoot, mergeSrcUrl) {
  // Merge src dirs/urls into a multimanifest if specified
  const mergeSrcDirs = []; // src urls were specified to merge in, so download and decompress them

  if (mergeSrcUrl.length > 0) {
    // delete .tmp if it exists and recreate it anew
    const tmpFolder = _path().default.resolve(projectRoot, '.tmp');

    await _fsExtra().default.remove(tmpFolder);
    await _fsExtra().default.ensureDir(tmpFolder); // Download the urls into a tmp dir

    const downloadDecompressPromises = mergeSrcUrl.map(async url => {
      // Add the absolute paths to srcDir
      const uniqFilename = `${_path().default.basename(url, '.tar.gz')}_${_crypto().default.randomBytes(16).toString('hex')}`;

      const tmpFolderUncompressed = _path().default.resolve(tmpFolder, uniqFilename);

      await _fsExtra().default.ensureDir(tmpFolderUncompressed);
      await (0, _Tar().downloadAndDecompressAsync)(url, tmpFolderUncompressed); // add the decompressed folder to be merged

      mergeSrcDirs.push(tmpFolderUncompressed);
    });
    await Promise.all(downloadDecompressPromises);
  }

  return mergeSrcDirs;
}

async function actionAsync(projectRoot, options) {
  if (!options.experimentalBundle) {
    // Ensure URL
    options.publicUrl = await ensurePublicUrlAsync(options.publicUrl, options.dev);
  } // Ensure the output directory is created


  const outputPath = _path().default.resolve(projectRoot, options.outputDir);

  await _fsExtra().default.ensureDir(outputPath);
  await CreateApp().assertFolderEmptyAsync({
    projectRoot: outputPath,
    folderName: options.outputDir,
    // Always overwrite files, this is inline with most bundler tooling.
    overwrite: true
  }); // Wrap the XDL method for exporting assets

  await exportFilesAsync(projectRoot, options); // Merge src dirs/urls into a multimanifest if specified

  const mergeSrcDirs = await collectMergeSourceUrlsAsync(projectRoot, options.mergeSrcUrl); // add any local src dirs to be merged

  mergeSrcDirs.push(...options.mergeSrcDir);
  await mergeSourceDirectoriresAsync(projectRoot, mergeSrcDirs, options);

  _log().default.log(`Export was successful. Your exported files can be found in ${options.outputDir}`);
}
//# sourceMappingURL=exportAsync.js.map