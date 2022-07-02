"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installCustomExitHook = installCustomExitHook;
exports.installExitHooks = installExitHooks;

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

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function installExitHooks(projectRoot) {
  const killSignals = ['SIGINT', 'SIGTERM'];

  for (const signal of killSignals) {
    process.on(signal, () => {
      const currentSpinner = _log().default.getSpinner();

      if (currentSpinner) {
        currentSpinner.fail();

        _log().default.setSpinner(null);
      }

      const currentProgress = _log().default.getProgress();

      if (currentProgress) {
        currentProgress.terminate();

        _log().default.setBundleProgressBar(null);
      }

      const spinner = (0, _ora().ora)({
        text: 'Stopping server',
        color: 'white'
      }).start();

      _log().default.setSpinner(spinner);

      _xdl().Project.stopAsync(projectRoot).then(() => {
        spinner.stopAndPersist({
          text: 'Stopped server',
          symbol: `\u203A`
        });
        process.exit();
      }).catch(error => {
        spinner.fail('Failed to stop server');

        _log().default.error(error);
      });
    });
  }
}

function installCustomExitHook(listener) {
  const killSignals = ['SIGINT', 'SIGTERM'];

  for (const signal of killSignals) {
    process.on(signal, listener);
  }
}
//# sourceMappingURL=installExitHooks.js.map