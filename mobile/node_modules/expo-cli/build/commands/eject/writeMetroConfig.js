"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeMetroConfig = writeMetroConfig;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _ora() {
  const data = require("../../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _TerminalLink() {
  const data = require("../utils/TerminalLink");

  _TerminalLink = function () {
    return data;
  };

  return data;
}

function _updatePackageJson() {
  const data = require("./updatePackageJson");

  _updatePackageJson = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeMetroConfig({
  projectRoot,
  pkg,
  tempDir
}) {
  /**
   * Add metro config, or warn if metro config already exists. The developer will need to add the
   * hashAssetFiles plugin manually.
   */
  const updatingMetroConfigStep = (0, _ora().logNewSection)('Adding Metro bundler config');

  try {
    const sourceConfigPath = _path().default.join(tempDir, 'metro.config.js');

    const targetConfigPath = _path().default.join(projectRoot, 'metro.config.js');

    const targetConfigPathExists = _fsExtra().default.existsSync(targetConfigPath);

    if (targetConfigPathExists) {
      // Prevent re-runs from throwing an error if the metro config hasn't been modified.
      const contents = (0, _updatePackageJson().createFileHash)(_fsExtra().default.readFileSync(targetConfigPath, 'utf8'));
      const targetContents = (0, _updatePackageJson().createFileHash)(_fsExtra().default.readFileSync(sourceConfigPath, 'utf8'));

      if (contents !== targetContents) {
        throw new (_CommandError().default)('Existing Metro config found; not overwriting.');
      } else {
        // Nothing to change, hide the step and exit.
        updatingMetroConfigStep.stop();
        updatingMetroConfigStep.clear();
        return;
      }
    } else if (_fsExtra().default.existsSync(_path().default.join(projectRoot, 'metro.config.json')) || pkg.metro || _fsExtra().default.existsSync(_path().default.join(projectRoot, 'rn-cli.config.js'))) {
      throw new (_CommandError().default)('Existing Metro config found; not overwriting.');
    }

    _fsExtra().default.copySync(sourceConfigPath, targetConfigPath);

    updatingMetroConfigStep.succeed('Added Metro config');
  } catch (e) {
    updatingMetroConfigStep.stopAndPersist({
      symbol: '⚠️ ',
      text: _chalk().default.yellow('Skipped Metro config updates:')
    });

    _log().default.nested(`\u203A ${e.message}`);

    _log().default.nested(`\u203A You will need to extend the default ${_chalk().default.bold('@expo/metro-config')} in your Metro config.\n  ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://docs.expo.dev/guides/customizing-metro'))}`);

    _log().default.newLine();
  }
}
//# sourceMappingURL=writeMetroConfig.js.map