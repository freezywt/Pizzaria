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

function _log() {
  const data = _interopRequireDefault(require("../log"));

  _log = function () {
    return data;
  };

  return data;
}

function TerminalLink() {
  const data = _interopRequireWildcard(require("./utils/TerminalLink"));

  TerminalLink = function () {
    return data;
  };

  return data;
}

function _applyAsyncAction() {
  const data = require("./utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logMigration(platform) {
  _log().default.newLine();

  _log().default.log(`${_chalk().default.bold(`expo upload:${platform}`)} has been superseded by ${_chalk().default.bold`eas submit`}. ${_chalk().default.dim(TerminalLink().learnMore(`https://expo.fyi/expo-upload-${platform}`))}`);

  _log().default.newLine();

  _log().default.log('Run the following:');

  _log().default.newLine();

  _log().default.log('\u203A ' + _chalk().default.cyan.bold('npm install -g eas-cli'));

  _log().default.log(`\u203A ${TerminalLink().linkedText(_chalk().default.cyan.bold(`eas submit -p ${platform}`), `https://docs.expo.dev/submit/${platform}`)}`);

  _log().default.newLine();
} // TODO: Drop this entire command category in mid to late 2022


function _default(program) {
  const migrateToEasJsonProperty = named => `Migrate to ${_chalk().default.bold`eas.json`}'s ${_chalk().default.bold(named)} property`;

  const migrateToEasCliArg = cmd => `Migrate to ${_chalk().default.bold(`eas submit ${cmd}`)}`;

  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('upload:android [path]').alias('ua').description(`${_chalk().default.yellow`Superseded`} by ${_chalk().default.bold`eas submit`} in eas-cli`).helpGroup('deprecated').option('--verbose', migrateToEasCliArg('--verbose')).option('--latest', migrateToEasCliArg('--latest')).option('--id <id>', migrateToEasCliArg('--id <id>')).option('--path [path]', migrateToEasCliArg('--path <path>')).option('--url <url>', migrateToEasCliArg('--url <url>')).option('--android-package <android-package>', `Migrate to ${_chalk().default.bold`eas submit`} (android-package is auto inferred)`).option('--type <archive-type>', `Migrate to ${_chalk().default.bold`eas submit`} (type is auto inferred)`).option('--key <key>', migrateToEasJsonProperty('serviceAccountKeyPath')).option('--track <track>', migrateToEasJsonProperty('track')).option('--release-status <release-status>', migrateToEasJsonProperty('releaseStatus')), async () => ({
    async actionAsync() {
      logMigration('android');
    }

  }));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('upload:ios [path]').alias('ui').description(`${_chalk().default.yellow`Superseded`} by ${_chalk().default.bold`eas submit`} in eas-cli`).helpGroup('deprecated').option('--verbose', migrateToEasCliArg('--verbose')).option('--latest', migrateToEasCliArg('--latest')).option('--id <id>', migrateToEasCliArg('--id <id>')).option('--path [path]', migrateToEasCliArg('--path <path>')).option('--url <url>', migrateToEasCliArg('--url <url>')).option('--apple-id <apple-id>', migrateToEasJsonProperty('appleId')).option('--itc-team-id <itc-team-id>', migrateToEasJsonProperty('appleTeamId')).option('--app-name <app-name>', migrateToEasJsonProperty('appName')).option('--company-name <company-name>', migrateToEasJsonProperty('companyName')).option('--sku <sku>', migrateToEasJsonProperty('sku')).option('--language <language>', migrateToEasJsonProperty('language')), async () => ({
    async actionAsync() {
      logMigration('ios');
    }

  }));
}
//# sourceMappingURL=upload.js.map