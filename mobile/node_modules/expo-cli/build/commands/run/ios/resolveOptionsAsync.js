"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveOptionsAsync = resolveOptionsAsync;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
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

function _glob() {
  const data = require("glob");

  _glob = function () {
    return data;
  };

  return data;
}

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = require("../../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _profileMethod() {
  const data = require("../../utils/profileMethod");

  _profileMethod = function () {
    return data;
  };

  return data;
}

function _resolvePortAsync() {
  const data = require("../utils/resolvePortAsync");

  _resolvePortAsync = function () {
    return data;
  };

  return data;
}

function _resolveDeviceAsync() {
  const data = require("./resolveDeviceAsync");

  _resolveDeviceAsync = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ignoredPaths = ['**/@(Carthage|Pods|vendor|node_modules)/**'];

function findXcodeProjectPaths(projectRoot, extension) {
  return (0, _glob().sync)(`ios/*.${extension}`, {
    absolute: true,
    cwd: projectRoot,
    ignore: ignoredPaths
  });
}

function resolveXcodeProject(projectRoot) {
  let paths = findXcodeProjectPaths(projectRoot, 'xcworkspace');

  if (paths.length) {
    return {
      // Use full path instead of relative project root so that warnings and errors contain full paths as well, this helps with filtering.
      // Also helps keep things consistent in monorepos.
      name: paths[0],
      // name: path.relative(projectRoot, paths[0]),
      isWorkspace: true
    };
  }

  paths = findXcodeProjectPaths(projectRoot, 'xcodeproj');

  if (paths.length) {
    return {
      name: paths[0],
      isWorkspace: false
    };
  }

  throw new (_CommandError().default)(`Xcode project not found in project: ${projectRoot}`);
}

const isMac = process.platform === 'darwin';

function getDefaultUserTerminal() {
  const {
    REACT_TERMINAL,
    TERM_PROGRAM,
    TERM
  } = process.env;

  if (REACT_TERMINAL) {
    return REACT_TERMINAL;
  }

  if (isMac) {
    return TERM_PROGRAM;
  }

  return TERM;
}

async function resolveNativeSchemeAsync(projectRoot, {
  scheme,
  configuration
}) {
  let resolvedScheme = null; // @ts-ignore

  if (scheme === true) {
    const schemes = _configPlugins().IOSConfig.BuildScheme.getRunnableSchemesFromXcodeproj(projectRoot, {
      configuration
    });

    if (!schemes.length) {
      throw new (_CommandError().default)('No native iOS build schemes found');
    }

    resolvedScheme = schemes[0];

    if (schemes.length > 1) {
      var _schemes$find;

      const resolvedSchemeName = await (0, _prompts().selectAsync)({
        message: 'Select a scheme',
        choices: schemes.map(value => {
          const isApp = value.type === _configPlugins().IOSConfig.Target.TargetType.APPLICATION && value.osType === 'iOS';
          return {
            value: value.name,
            title: isApp ? _chalk().default.bold(value.name) + _chalk().default.gray(' (app)') : value.name
          };
        })
      }, {
        nonInteractiveHelp: `--scheme: argument must be provided with a string in non-interactive mode. Valid choices are: ${schemes.join(', ')}`
      });
      resolvedScheme = (_schemes$find = schemes.find(({
        name
      }) => resolvedSchemeName === name)) !== null && _schemes$find !== void 0 ? _schemes$find : null;
    } else {
      _log().default.log(`Auto selecting only available scheme: ${resolvedScheme.name}`);
    }
  } else if (scheme) {
    // Attempt to match the schemes up so we can open the correct simulator
    const schemes = _configPlugins().IOSConfig.BuildScheme.getRunnableSchemesFromXcodeproj(projectRoot, {
      configuration
    });

    resolvedScheme = schemes.find(({
      name
    }) => name === scheme) || {
      name: scheme
    };
  }

  return resolvedScheme;
}

async function resolveOptionsAsync(projectRoot, options) {
  var _ref, _await$resolveNativeS, _options$bundler;

  const xcodeProject = resolveXcodeProject(projectRoot);
  let port = options.bundler ? await (0, _resolvePortAsync().resolvePortAsync)(projectRoot, {
    reuseExistingPort: true,
    defaultPort: options.port
  }) : null; // Skip bundling if the port is null

  options.bundler = !!port;

  if (!port) {
    // any random number
    port = 8081;
  }

  const resolvedScheme = (_ref = (_await$resolveNativeS = await resolveNativeSchemeAsync(projectRoot, options)) !== null && _await$resolveNativeS !== void 0 ? _await$resolveNativeS : (0, _profileMethod().profileMethod)(_configPlugins().IOSConfig.BuildScheme.getRunnableSchemesFromXcodeproj)(projectRoot, {
    configuration: options.configuration
  })[0]) !== null && _ref !== void 0 ? _ref : {
    name: path().basename(xcodeProject.name, path().extname(xcodeProject.name))
  };
  const device = await (0, _resolveDeviceAsync().resolveDeviceAsync)(options.device, {
    osType: resolvedScheme.osType
  });
  const isSimulator = !('deviceType' in device) || device.deviceType.startsWith('com.apple.CoreSimulator.SimDeviceType.');
  const configuration = options.configuration || 'Debug'; // This optimization skips resetting the Metro cache needlessly.
  // The cache is reset in `../node_modules/react-native/scripts/react-native-xcode.sh` when the
  // project is running in Debug and built onto a physical device. It seems that this is done because
  // the script is run from Xcode and unaware of the CLI instance.

  const shouldSkipInitialBundling = configuration === 'Debug' && !isSimulator;
  return {
    projectRoot,
    isSimulator,
    xcodeProject,
    device,
    configuration: options.configuration || 'Debug',
    shouldStartBundler: (_options$bundler = options.bundler) !== null && _options$bundler !== void 0 ? _options$bundler : false,
    shouldSkipInitialBundling,
    port,
    buildCache: options.buildCache,
    terminal: getDefaultUserTerminal(),
    scheme: resolvedScheme.name
  };
}
//# sourceMappingURL=resolveOptionsAsync.js.map