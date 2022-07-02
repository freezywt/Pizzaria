"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpAsync = getExpAsync;
exports.startBuildAsync = startBuildAsync;
exports.validateOptions = validateOptions;

function _config() {
  const data = require("@expo/config");

  _config = function () {
    return data;
  };

  return data;
}

function _joi() {
  const data = _interopRequireDefault(require("joi"));

  _joi = function () {
    return data;
  };

  return data;
}

function _slugify() {
  const data = _interopRequireDefault(require("slugify"));

  _slugify = function () {
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

function validateOptions(options) {
  const schema = _joi().default.object().keys({
    current: _joi().default.boolean(),
    mode: _joi().default.string(),
    platform: _joi().default.any().valid('ios', 'android', 'all'),
    expIds: _joi().default.array(),
    type: _joi().default.any().valid('archive', 'simulator', 'client', 'app-bundle', 'apk'),
    releaseChannel: _joi().default.string().regex(/[a-z\d][a-z\d._-]*/),
    bundleIdentifier: _joi().default.string().regex(/^[a-zA-Z0-9-.]+$/),
    publicUrl: _joi().default.string(),
    sdkVersion: _joi().default.string().strict()
  });

  const {
    error
  } = schema.validate(options);

  if (error) {
    throw new (_xdl().XDLError)('INVALID_OPTIONS', error.toString());
  }
}

async function getConfigAsync(projectRoot, options = {}) {
  if (!options.publicUrl) {
    // get the manifest from the project directory
    const {
      exp,
      pkg
    } = (0, _config().getConfig)(projectRoot);
    const configName = (0, _config().configFilename)(projectRoot);
    return {
      exp,
      pkg,
      configName: (0, _config().configFilename)(projectRoot),
      configPrefix: configName === 'app.json' ? 'expo.' : ''
    };
  } else {
    // get the externally hosted manifest
    return {
      exp: await _xdl().ThirdParty.getManifest(options.publicUrl, options),
      configName: options.publicUrl,
      configPrefix: '',
      pkg: {}
    };
  }
}

async function getExpAsync(projectRoot, options) {
  const {
    exp,
    pkg,
    configName,
    configPrefix
  } = await getConfigAsync(projectRoot, options);

  if (!exp || !pkg) {
    throw new (_xdl().XDLError)('NO_PACKAGE_JSON', `Couldn't read ${configName} file in project at ${projectRoot}`);
  } // Support version and name being specified in package.json for legacy
  // support pre: exp.json


  if (!exp.version && 'version' in pkg && pkg.version) {
    exp.version = pkg.version;
  }

  if (!exp.name && 'name' in pkg && typeof pkg.name === 'string') {
    exp.name = pkg.name;
  }

  if (!exp.slug && typeof exp.name === 'string') {
    exp.slug = (0, _slugify().default)(exp.name.toLowerCase());
  }

  return {
    exp,
    configName,
    configPrefix
  };
}

async function startBuildAsync(projectRoot, options = {}) {
  const user = await _xdl().UserManager.ensureLoggedInAsync();
  validateOptions(options);
  const {
    exp,
    configName,
    configPrefix
  } = await getExpAsync(projectRoot, options);
  validateManifest(options, exp, configName, configPrefix);

  _xdl().Analytics.logEvent('Build Shell App', {
    projectRoot,
    developerTool: _xdl().Config.developerTool,
    platform: options.platform
  });

  const api = _xdl().ApiV2.clientForUser(user);

  return await api.putAsync('build/start', {
    manifest: exp,
    options
  });
}

function validateManifest(options, exp, configName, configPrefix) {
  if (options.platform === 'ios' || options.platform === 'all') {
    if (!exp.ios || !exp.ios.bundleIdentifier) {
      throw new (_xdl().XDLError)('INVALID_MANIFEST', `Must specify a bundle identifier in order to build this experience for iOS. ` + `Please specify one in ${configName} at "${configPrefix}ios.bundleIdentifier"`);
    }
  }

  if (options.platform === 'android' || options.platform === 'all') {
    if (!exp.android || !exp.android.package) {
      throw new (_xdl().XDLError)('INVALID_MANIFEST', `Must specify a java package in order to build this experience for Android. ` + `Please specify one in ${configName} at "${configPrefix}android.package"`);
    }
  }
}
//# sourceMappingURL=startBuildAsync.js.map