"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveDeviceAsync = resolveDeviceAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _ora() {
  const data = require("../../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = _interopRequireDefault(require("../../../utils/prompts"));

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getBuildDestinationsAsync({
  osType
} = {}) {
  const devices = (await (0, _profileMethod().profileMethod)(_xdl().SimControl.listDevicesAsync, 'SimControl.listDevicesAsync')()).filter(device => {
    return device.deviceType === 'device';
  });
  const simulators = await _xdl().Simulator.sortDefaultDeviceToBeginningAsync(await (0, _profileMethod().profileMethod)(_xdl().SimControl.listSimulatorDevicesAsync)(), osType);
  return [...devices, ...simulators];
}

async function resolveDeviceAsync(device, {
  osType
} = {}) {
  if (!(await (0, _profileMethod().profileMethod)(_xdl().Simulator.ensureXcodeCommandLineToolsInstalledAsync)())) {
    throw new (_CommandError().default)('Unable to verify Xcode and Simulator installation.');
  }

  if (!device) {
    const simulator = await (0, _profileMethod().profileMethod)(_xdl().Simulator.ensureSimulatorOpenAsync, 'Simulator.ensureSimulatorOpenAsync')({
      osType
    });

    _log().default.debug(`Resolved default (${osType}) device:`, simulator.name, simulator.udid);

    return simulator;
  } // Only use the spinner with xctrace since it's so slow (~2s), alternative
  // method is very fast (~50ms) and the flicker makes it seem slower.


  const spinner = _xdl().AppleDevice.isEnabled() ? null : (0, _ora().ora)(`🔍 Finding ${device === true ? 'devices' : `device ${_chalk().default.cyan(device)}`}`).start();
  let devices = await (0, _profileMethod().profileMethod)(getBuildDestinationsAsync)({
    osType
  }).catch(() => []);
  spinner === null || spinner === void 0 ? void 0 : spinner.stop();

  if (device === true) {
    // If osType is defined, then filter out ineligible simulators.
    // Only do this inside of the device selection so users who pass the entire device udid can attempt to select any simulator (even if it's invalid).
    if (osType) {
      devices = devices.filter(device => {
        // connected device
        if (!('osType' in device)) {
          return true;
        }

        return device.osType === osType;
      });
    } // --device with no props after


    const {
      value
    } = await (0, _prompts().default)({
      type: 'autocomplete',
      name: 'value',
      limit: 11,
      message: 'Select a simulator',
      choices: devices.map(item => {
        const isConnected = 'deviceType' in item && item.deviceType === 'device';
        const isActive = 'state' in item && item.state === 'Booted';
        const symbol = isConnected ? '🔌 ' : '';
        const format = isActive ? _chalk().default.bold : text => text;
        return {
          title: `${symbol}${format(item.name)}${item.osVersion ? _chalk().default.dim(` (${item.osVersion})`) : ''}`,
          value: item.udid
        };
      }),
      suggest: (input, choices) => {
        const regex = new RegExp(input, 'i');
        return choices.filter(choice => regex.test(choice.title));
      }
    });

    _log().default.log(_chalk().default.dim`\u203A Using --device ${value}`);

    const device = devices.find(device => device.udid === value);
    const isSimulator = !('deviceType' in device) || device.deviceType.startsWith('com.apple.CoreSimulator.SimDeviceType.');

    if (isSimulator) {
      return await _xdl().Simulator.ensureSimulatorOpenAsync({
        udid: device.udid
      });
    }

    return device;
  }

  const searchValue = device.toLowerCase();
  const resolved = devices.find(device => {
    return device.udid.toLowerCase() === searchValue || device.name.toLowerCase() === searchValue;
  });

  if (!resolved) {
    throw new (_CommandError().default)(`No device UDID or name matching "${device}"`);
  }

  const isSimulator = !('deviceType' in resolved) || resolved.deviceType.startsWith('com.apple.CoreSimulator.SimDeviceType.');

  if (isSimulator) {
    return await _xdl().Simulator.ensureSimulatorOpenAsync({
      udid: resolved.udid
    });
  }

  return resolved;
}
//# sourceMappingURL=resolveDeviceAsync.js.map