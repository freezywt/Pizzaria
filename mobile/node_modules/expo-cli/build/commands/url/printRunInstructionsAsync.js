"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = printRunInstructionsAsync;

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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function printRunInstructionsAsync() {
  const user = await _xdl().UserManager.getCurrentUserAsync(); // If no user, we are offline and can't connect

  if (user) {
    _log().default.newLine();

    _log().default.log(_chalk().default.bold('Instructions to open this project on a physical device'));

    _log().default.log(`${_chalk().default.underline('Android devices')}: scan the above QR code.`);

    _log().default.log(`${_chalk().default.underline('iOS devices')}: run ${_chalk().default.bold('expo send -s <your-email-address>')} in this project directory in another terminal window to send the URL to your device.`); // NOTE(brentvatne) Uncomment this when we update iOS client
    // log.log(
    //   `Alternatively, sign in to your account (${chalk.bold(
    //     user.username
    //   )}) in the latest version of Expo Go on your iOS or Android device. Your projects will automatically appear in the "Projects" tab.`
    // );

  }

  _log().default.newLine();

  _log().default.log(_chalk().default.bold('Instructions to open this project on a simulator'));

  _log().default.log(`If you already have the simulator installed, run ${_chalk().default.bold('expo ios')} or ${_chalk().default.bold('expo android')} in this project directory in another terminal window.`);

  _log().default.newLine();
}
//# sourceMappingURL=printRunInstructionsAsync.js.map