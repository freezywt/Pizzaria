"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logNextSteps = logNextSteps;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _terminalLink() {
  const data = _interopRequireDefault(require("terminal-link"));

  _terminalLink = function () {
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

function _TerminalLink() {
  const data = require("../utils/TerminalLink");

  _TerminalLink = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logNextSteps({
  exp,
  hasNewProjectFiles,
  platforms,
  podInstall,
  nodeInstall,
  packageManager
}, {
  legacyUpdates
}) {
  const hasAssetBundlePatterns = exp.hasOwnProperty('assetBundlePatterns');

  _log().default.newLine();

  _log().default.nested(`➡️  ${_chalk().default.bold('Next steps')}`); // Log a warning about needing to install node modules


  if (nodeInstall) {
    const installCmd = packageManager === 'npm' ? 'npm install' : 'yarn';

    _log().default.nested(`\u203A ⚠️  Install node modules: ${_chalk().default.bold(installCmd)}`);
  }

  if (podInstall) {
    _log().default.nested(`\u203A 🍫 When CocoaPods is installed, initialize the project workspace: ${_chalk().default.bold('npx pod-install')}`);
  }

  _log().default.nested(`\u203A 💡 You may want to run ${_chalk().default.bold('npx @react-native-community/cli doctor')} to help install any tools that your app may need to run your native projects.`);

  _log().default.nested(`\u203A 🔑 Download your Android keystore (if you're not sure if you need to, just run the command and see): ${_chalk().default.bold('expo fetch:android:keystore')}`);

  if (hasAssetBundlePatterns) {
    _log().default.nested(`\u203A 📁 The property ${_chalk().default.bold(`assetBundlePatterns`)} does not have the same effect in the bare workflow.\n  ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://docs.expo.dev/bare/updating-your-app/#embedding-assets'))}`);
  }

  if (legacyUpdates) {
    _log().default.nested(`\u203A 🚀 ${((0, _terminalLink().default)('expo-updates', 'https://github.com/expo/expo/blob/master/packages/expo-updates/README.md'), {
      fallback: text => text
    })} has been configured in your project. Before you do a release build, make sure you run ${_chalk().default.bold('expo publish')}. ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://expo.fyi/release-builds-with-expo-updates'))}`);
  }

  if (hasNewProjectFiles) {
    _log().default.newLine();

    _log().default.nested(`☑️  ${_chalk().default.bold('When you are ready to run your project')}`);

    _log().default.nested('To compile and run your project in development, execute one of the following commands:');

    if (platforms.includes('ios')) {
      _log().default.nested(`\u203A ${_chalk().default.bold(packageManager === 'npm' ? 'npm run ios' : 'yarn ios')}`);
    }

    if (platforms.includes('android')) {
      _log().default.nested(`\u203A ${_chalk().default.bold(packageManager === 'npm' ? 'npm run android' : 'yarn android')}`);
    }

    _log().default.nested(`\u203A ${_chalk().default.bold(packageManager === 'npm' ? 'npm run web' : 'yarn web')}`);
  }
}
//# sourceMappingURL=logNextSteps.js.map