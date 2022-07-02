"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertInstalledAsync = assertInstalledAsync;
exports.installOnDeviceAsync = installOnDeviceAsync;
exports.isInstalledAsync = isInstalledAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
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

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _wrapAnsi() {
  const data = _interopRequireDefault(require("wrap-ansi"));

  _wrapAnsi = function () {
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

function _ora() {
  const data = require("../../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function isInstalledAsync() {
  try {
    await (0, _spawnAsync().default)('ios-deploy', ['--version'], {
      stdio: 'ignore'
    });
    return true;
  } catch {
    return false;
  }
}

async function installOnDeviceAsync(props) {
  const {
    bundle,
    appDeltaDirectory,
    udid,
    deviceName
  } = props;
  const args = ['--bundle', bundle, '--id', udid, '--justlaunch', // Wifi devices tend to stall and never resolve
  '--no-wifi'];

  if (appDeltaDirectory) {
    args.push('--app_deltas', appDeltaDirectory);
  } // TODO: Attach LLDB debugger for native logs
  // '--debug'


  _log().default.debug(`  ios-deploy ${args.join(' ')}`);

  let indicator;
  let copyingFileCount = 0;
  let currentPhase;
  const output = await spawnIOSDeployAsync(args, message => {
    const loadingMatch = message.match(/\[(.*?)\] (.*)/m);

    if (loadingMatch) {
      const progress = tryParsingNumericValue(loadingMatch[1]);
      const message = loadingMatch[2];

      if (indicator) {
        indicator.text = `${_chalk().default.bold(currentPhase)} ${progress}%`;
      }

      if (message.startsWith('Copying ')) {
        copyingFileCount++;
      }

      return;
    } // Install, Debug, Uninstall


    const phaseMatch = message.match(/------\s(\w+) phase\s------/m);

    if (phaseMatch) {
      var _phaseMatch$, _phaseMatch$$trim, _PhaseNameMap$phase;

      let phase = (_phaseMatch$ = phaseMatch[1]) === null || _phaseMatch$ === void 0 ? void 0 : (_phaseMatch$$trim = _phaseMatch$.trim) === null || _phaseMatch$$trim === void 0 ? void 0 : _phaseMatch$$trim.call(_phaseMatch$); // Remap name

      phase = (_PhaseNameMap$phase = PhaseNameMap[phase]) !== null && _PhaseNameMap$phase !== void 0 ? _PhaseNameMap$phase : phase;

      if (indicator) {
        if (currentPhase === 'Installing') {
          const copiedMessage = _chalk().default.gray`Copied ${copyingFileCount} file(s)`; // Emulate Xcode copy file count, this helps us know if app deltas are working.

          indicator.succeed(`${_chalk().default.bold('Installed')} ${copiedMessage}`);
        } else {
          indicator.succeed();
        }
      }

      indicator = (0, _ora().ora)(phase).start();
      currentPhase = phase;
      return;
    }

    _log().default.debug(message);
  });

  if (output.code !== 0) {
    if (indicator) {
      indicator.fail();
    } // Allow users to unlock their phone and try the launch over again.


    if (output.error.includes('The device is locked')) {
      var _path$basename$split$;

      // Get the app name from the binary path.
      const appName = (_path$basename$split$ = _path().default.basename(bundle).split('.')[0]) !== null && _path$basename$split$ !== void 0 ? _path$basename$split$ : 'app';

      if (!_commander().default.nonInteractive && (await _xdl().Prompts.confirmAsync({
        message: `Cannot launch ${appName} because the device is locked. Unlock ${deviceName} to continue...`,
        initial: true
      }))) {
        return installOnDeviceAsync(props);
      } else {
        throw new (_CommandError().default)(`Cannot launch ${appName} on ${deviceName} because the device is locked.`);
      }
    }

    throw new (_CommandError().default)(`Failed to install the app on device. Error in "ios-deploy" command: ${output.error}`);
  } else {
    if (indicator) {
      if (currentPhase === 'Launching') {
        indicator.succeed(`${_chalk().default.bold`Launched`} ${_chalk().default.gray(`on ${deviceName}`)}`);
      } else {
        indicator.succeed();
      }
    }
  }
}

const PhaseNameMap = {
  Install: 'Installing',
  Debug: 'Launching',
  Uninstall: 'Uninstalling'
};

function tryParsingNumericValue(str) {
  try {
    var _str$match$, _str$match;

    return parseInt((_str$match$ = str === null || str === void 0 ? void 0 : (_str$match = str.match(/\d+/)) === null || _str$match === void 0 ? void 0 : _str$match[0]) !== null && _str$match$ !== void 0 ? _str$match$ : '-1', 10);
  } catch {
    return -1;
  }
}

function spawnIOSDeployAsync(args, onStdout) {
  return new Promise(async (resolve, reject) => {
    const fork = (0, _child_process().spawn)('ios-deploy', args);
    let output = '';
    let errorOutput = '';
    fork.stdout.on('data', data => {
      const stringData = data.toString().split(_os().default.EOL);

      for (let line of stringData) {
        line = line.trim();
        if (!line) continue;

        if (line.match(/Error: /)) {
          errorOutput = line;
        } else {
          output += line;
          onStdout(line);
        }
      }
    });
    fork.stderr.on('data', data => {
      const stringData = data instanceof Buffer ? data.toString() : data;
      errorOutput += stringData;
    });
    fork.on('close', code => {
      resolve({
        output,
        error: errorOutput,
        code
      });
    });
  });
}

async function assertInstalledAsync() {
  if (!(await isInstalledAsync())) {
    if (await _xdl().Prompts.confirmAsync({
      message: `Required package ${_chalk().default.cyan`ios-deploy`} is not installed, would you like to try installing it with homebrew?`,
      initial: true
    })) {
      try {
        await brewInstallAsync();
        return;
      } catch (error) {
        _log().default.error(`Failed to install ${_chalk().default.bold`ios-deploy`} with homebrew: ${error.message}`);
      }
    } // Controlled error message.


    const error = `Cannot install iOS apps on devices without ${_chalk().default.bold`ios-deploy`} installed globally. Please install it with ${_chalk().default.bold`brew install ios-deploy`} and try again, or build the app with a simulator.`;

    _log().default.warn((0, _wrapAnsi().default)(error, process.stdout.columns || 80));

    throw new (_CommandError().SilentError)(error);
  }
}

async function brewInstallAsync() {
  await (0, _spawnAsync().default)('brew', ['install', 'ios-deploy'], {
    stdio: 'inherit'
  });
}
//# sourceMappingURL=IOSDeploy.js.map