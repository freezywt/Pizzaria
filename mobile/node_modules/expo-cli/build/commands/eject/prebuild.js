"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _applyAsyncAction() {
  const data = require("../utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(program) {
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('prebuild [path]').description(`Create native iOS and Android project files before building natively. ${_chalk().default.dim((0, _TerminalLink().learnMore)('https://docs.expo.dev/workflow/customizing/'))}`).longDescription('Generate the native iOS and Android projects for your app before building them. The generated code should not be modified directly, instead config plugins should be used to make modifications.').helpGroup('eject').option('--no-install', 'Skip installing npm packages and CocoaPods.').option('--clean', 'Delete the native folders and regenerate them before applying changes').option('--npm', 'Use npm to install dependencies. (default when Yarn is not installed)').option('--template <template>', 'Project template to clone from. File path pointing to a local tar file or a github repo').option('-p, --platform <all|android|ios>', 'Platforms to sync: ios, android, all. Default: all').option('--skip-dependency-update <dependencies>', 'Preserves versions of listed packages in package.json (comma separated list)'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./prebuildAsync'))));
}
//# sourceMappingURL=prebuild.js.map