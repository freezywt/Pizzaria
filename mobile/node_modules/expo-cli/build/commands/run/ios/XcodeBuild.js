"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAsync = buildAsync;
exports.getAppBinaryPath = getAppBinaryPath;
exports.getEscapedPath = getEscapedPath;
exports.getProjectBuildSettings = getProjectBuildSettings;
exports.logPrettyItem = logPrettyItem;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _xcpretty() {
  const data = require("@expo/xcpretty");

  _xcpretty = function () {
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

function _child_process() {
  const data = require("child_process");

  _child_process = function () {
    return data;
  };

  return data;
}

function fs() {
  const data = _interopRequireWildcard(require("fs-extra"));

  fs = function () {
    return data;
  };

  return data;
}

function _os() {
  const data = _interopRequireDefault(require("os"));

  _os = function () {
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
  const data = _interopRequireWildcard(require("../../../CommandError"));

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

function _developmentCodeSigning() {
  const data = require("./developmentCodeSigning");

  _developmentCodeSigning = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logPrettyItem(message) {
  _log().default.log(`${_chalk().default.whiteBright`\u203A`} ${message}`);
}

async function getProjectBuildSettings(xcodeProject, configuration, sdkName, scheme) {
  const args = [xcodeProject.isWorkspace ? '-workspace' : '-project', xcodeProject.name, '-scheme', scheme, '-sdk', sdkName, // getPlatformName(buildOutput),
  '-configuration', configuration, '-showBuildSettings', '-json'];

  _log().default.debug(`  xcodebuild ${args.join(' ')}`);

  const {
    stdout
  } = await (0, _spawnAsync().default)('xcodebuild', args, {
    stdio: 'pipe'
  });

  try {
    return JSON.parse(stdout);
  } catch (error) {
    // This can fail if the xcodebuild command throws a simulator error:
    // 2021-01-24 14:22:43.802 xcodebuild[73087:14664906]  DVTAssertions: Warning in /Library/Caches/com.apple.xbs/Sources/DVTiOSFrameworks/DVTiOSFrameworks-17705/DTDeviceKitBase/DTDKRemoteDeviceData.m:371
    _log().default.warn(error.message);

    if (error.message.match(/in JSON at position/)) {
      _log().default.log(_chalk().default.dim(stdout));
    }

    return {};
  }
}
/**
 *
 * @returns '/Users/evanbacon/Library/Developer/Xcode/DerivedData/myapp-gpgjqjodrxtervaufttwnsgimhrx/Build/Products/Debug-iphonesimulator/myapp.app'
 */


function getAppBinaryPath(buildOutput) {
  // Matches what's used in "Bundle React Native code and images" script.
  // Requires that `-hideShellScriptEnvironment` is not included in the build command (extra logs).
  // Like `\=/Users/evanbacon/Library/Developer/Xcode/DerivedData/Exponent-anpuosnglkxokahjhfszejloqfvo/Build/Products/Debug-iphonesimulator`
  const CONFIGURATION_BUILD_DIR = extractEnvVariableFromBuild(buildOutput, 'CONFIGURATION_BUILD_DIR').sort( // Longer name means more suffixes, we want the shortest possible one to be first.
  // Massive projects (like Expo Go) can sometimes print multiple different sets of environment variables.
  // This can become an issue with some
  (a, b) => a.length - b.length); // Like `Exponent.app`

  const UNLOCALIZED_RESOURCES_FOLDER_PATH = extractEnvVariableFromBuild(buildOutput, 'UNLOCALIZED_RESOURCES_FOLDER_PATH');
  const binaryPath = path().join( // Use the shortest defined env variable (usually there's just one).
  CONFIGURATION_BUILD_DIR[0], // Use the last defined env variable.
  UNLOCALIZED_RESOURCES_FOLDER_PATH[UNLOCALIZED_RESOURCES_FOLDER_PATH.length - 1]); // If the app has a space in the name it'll fail because it isn't escaped properly by Xcode.

  return getEscapedPath(binaryPath);
}

function getEscapedPath(filePath) {
  if (fs().existsSync(filePath)) {
    return filePath;
  }

  const unescapedPath = filePath.split(/\\ /).join(' ');

  if (fs().existsSync(unescapedPath)) {
    return unescapedPath;
  }

  throw new Error(`Unexpected: Generated app at path "${filePath}" cannot be read, the app cannot be installed. Please report this and build onto a simulator.`);
}

function extractEnvVariableFromBuild(buildOutput, variableName) {
  // Xcode can sometimes escape `=` with a backslash or put the value in quotes
  const reg = new RegExp(`export ${variableName}\\\\?=(.*)$`, 'mg');
  const matched = [...buildOutput.matchAll(reg)];

  if (!matched || !matched.length) {
    throw new (_CommandError().default)(`Malformed xcodebuild results: "${variableName}" variable was not generated in build output. Please report this issue and run your project with Xcode instead.`);
  }

  return matched.map(value => value[1]).filter(Boolean);
}

function getProcessOptions({
  packager,
  shouldSkipInitialBundling,
  terminal,
  port
}) {
  const SKIP_BUNDLING = shouldSkipInitialBundling ? '1' : undefined;

  if (packager) {
    return {
      env: { ...process.env,
        RCT_TERMINAL: terminal,
        SKIP_BUNDLING,
        RCT_METRO_PORT: port.toString()
      }
    };
  }

  return {
    env: { ...process.env,
      RCT_TERMINAL: terminal,
      SKIP_BUNDLING,
      // Always skip launching the packager from a build script.
      // The script is used for people building their project directly from Xcode.
      // This essentially means "› Running script 'Start Packager'" does nothing.
      RCT_NO_LAUNCH_PACKAGER: 'true' // FORCE_BUNDLING: '0'

    }
  };
}

async function buildAsync({
  projectRoot,
  xcodeProject,
  device,
  configuration,
  isSimulator,
  scheme,
  shouldSkipInitialBundling,
  terminal,
  port,
  buildCache
}) {
  const args = [xcodeProject.isWorkspace ? '-workspace' : '-project', xcodeProject.name, '-configuration', configuration, '-scheme', scheme, '-destination', `id=${device.udid}`];

  if (!isSimulator) {
    const developmentTeamId = await (0, _developmentCodeSigning().ensureDeviceIsCodeSignedForDeploymentAsync)(projectRoot);

    if (developmentTeamId) {
      args.push(`DEVELOPMENT_TEAM=${developmentTeamId}`, '-allowProvisioningUpdates', '-allowProvisioningDeviceRegistration');
    }
  } // Add last


  if (buildCache === false) {
    args.push( // Will first clean the derived data folder.
    'clean', // Then build step must be added otherwise the process will simply clean and exit.
    'build');
  }

  _log().default.debug(`  xcodebuild ${args.join(' ')}`);

  logPrettyItem(_chalk().default.bold`Planning build`);

  const formatter = _xcpretty().ExpoRunFormatter.create(projectRoot, {
    xcodeProject,
    isDebug: _log().default.isDebug
  });

  return new Promise(async (resolve, reject) => {
    const buildProcess = (0, _child_process().spawn)('xcodebuild', args, getProcessOptions({
      packager: false,
      shouldSkipInitialBundling,
      terminal,
      port
    }));
    let buildOutput = '';
    let errorOutput = '';
    let currentBuffer = ''; // Data can be sent in chunks that would have no relevance to our regex
    // this can cause massive slowdowns, so we need to ensure the data is complete before attempting to parse it.

    function flushBuffer() {
      if (!currentBuffer) {
        return;
      }

      const data = currentBuffer; // Reset buffer.

      currentBuffer = ''; // Process data.

      const lines = formatter.pipe(data);

      for (const line of lines) {
        // Log parsed results.
        _log().default.log(line);
      }
    }

    buildProcess.stdout.on('data', data => {
      const stringData = data.toString();
      buildOutput += stringData;
      currentBuffer += stringData; // Only flush the data if we have a full line.

      if (currentBuffer.endsWith(_os().default.EOL)) {
        flushBuffer();
      }
    });
    buildProcess.stderr.on('data', data => {
      const stringData = data instanceof Buffer ? data.toString() : data;
      errorOutput += stringData;
    });
    buildProcess.on('close', code => {
      // Flush log data at the end just in case we missed something.
      flushBuffer();

      _log().default.debug(`Exited with code: ${code}`);

      if ( // User cancelled with ctrl-c
      code === null || // Build interrupted
      code === 75) {
        reject(new (_CommandError().AbortCommandError)());
        return;
      }

      _log().default.log(formatter.getBuildSummary());

      const logFilePath = writeBuildLogs(projectRoot, buildOutput, errorOutput);

      if (code !== 0) {
        // Determine if the logger found any errors;
        const wasErrorPresented = !!formatter.errors.length;
        const errorTitle = `Failed to build iOS project. "xcodebuild" exited with error code ${code}.`;

        if (wasErrorPresented) {
          // This has a flaw, if the user is missing a file, and there is a script error, only the missing file error will be shown.
          // They will only see the script error if they fix the missing file and rerun.
          // The flaw can be fixed by catching script errors in the custom logger.
          reject(new (_CommandError().default)(errorTitle));
          return;
        } // Show all the log info because often times the error is coming from a shell script,
        // that invoked a node script, that started metro, which threw an error.


        reject(new (_CommandError().default)(`${errorTitle}\nTo view more error logs, try building the app with Xcode directly, by opening ${xcodeProject.name}.\n\n` + buildOutput + '\n\n' + errorOutput + `Build logs written to ${_chalk().default.underline(logFilePath)}`));
        return;
      }

      resolve(buildOutput);
    });
  });
}

function writeBuildLogs(projectRoot, buildOutput, errorOutput) {
  const [logFilePath, errorFilePath] = getErrorLogFilePath(projectRoot);
  fs().writeFileSync(logFilePath, buildOutput);
  fs().writeFileSync(errorFilePath, errorOutput);
  return logFilePath;
}

function getErrorLogFilePath(projectRoot) {
  const folder = path().join(projectRoot, '.expo');
  fs().ensureDirSync(folder);
  return [path().join(folder, 'xcodebuild.log'), path().join(folder, 'xcodebuild-error.log')];
}
//# sourceMappingURL=XcodeBuild.js.map