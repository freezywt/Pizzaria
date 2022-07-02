"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypeScriptSetupDisabled = void 0;
exports.updateTSConfigAsync = updateTSConfigAsync;

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
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

function _getenv() {
  const data = require("getenv");

  _getenv = function () {
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

function _resolveModules() {
  const data = require("./resolveModules");

  _resolveModules = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TS_FEATURE_FLAG = 'EXPO_NO_TYPESCRIPT_SETUP';
const isTypeScriptSetupDisabled = (0, _getenv().boolish)(TS_FEATURE_FLAG, false);
exports.isTypeScriptSetupDisabled = isTypeScriptSetupDisabled;

async function updateTSConfigAsync({
  projectRoot,
  tsConfigPath,
  isBootstrapping
}) {
  if (isBootstrapping) {
    await _jsonFile().default.writeAsync(tsConfigPath, {});
  }

  const projectTSConfig = _jsonFile().default.read(tsConfigPath, {
    // Some tsconfig.json files have a generated comment in the file.
    json5: true
  });

  if (projectTSConfig.compilerOptions == null) {
    projectTSConfig.compilerOptions = {};
    isBootstrapping = true;
  }

  const modifications = []; // If the default TSConfig template exists (SDK +41), then use it in the project

  const hasTemplateTsconfig = (0, _resolveModules().resolveBaseTSConfig)(projectRoot);

  if (hasTemplateTsconfig) {
    // If the extends field isn't defined, set it to the expo default
    if (!projectTSConfig.extends) {
      // if (projectTSConfig.extends !== baseTSConfigName) {
      projectTSConfig.extends = _resolveModules().baseTSConfigName;
      modifications.push(['extends', _resolveModules().baseTSConfigName]);
    }
  } else if (isBootstrapping) {
    // use an unversioned config when the versioned config cannot be resolved
    projectTSConfig.compilerOptions = {
      jsx: 'react-native',
      target: 'esnext',
      lib: ['esnext'],
      allowJs: true,
      skipLibCheck: true,
      noEmit: true,
      allowSyntheticDefaultImports: true,
      resolveJsonModule: true,
      esModuleInterop: true,
      moduleResolution: 'node'
    };
    modifications.push(['compilerOptions', 'configured']);
  } // If no changes, then quietly bail out


  if (!modifications.length) {
    return;
  } // Write changes and log out a summary of what changed


  await _jsonFile().default.writeAsync(tsConfigPath, projectTSConfig);

  _log().default.addNewLineIfNone();

  if (isBootstrapping) {
    _log().default.log(`${_chalk().default.bold`TypeScript`}: A ${_chalk().default.cyan('tsconfig.json')} has been auto-generated`);
  } else {
    _log().default.log(`${_chalk().default.bold`TypeScript`}: The ${_chalk().default.cyan('tsconfig.json')} has been updated ${_chalk().default.dim`(Use ${TS_FEATURE_FLAG} to skip)`}`);

    logModifications(modifications);
  }

  _log().default.newLine();
}

function logModifications(modifications) {
  _log().default.newLine();

  _log().default.log(`\u203A ${_chalk().default.bold('Required')} modifications made to the ${_chalk().default.cyan('tsconfig.json')}:`);

  _log().default.newLine(); // Sort the items based on key name length


  printTable(modifications.sort((a, b) => a[0].length - b[0].length));

  _log().default.newLine();
}

function printTable(items) {
  const tableFormat = (name, msg) => `  ${_chalk().default.bold`${name}`} is now ${_chalk().default.cyan(msg)}`;

  for (const [key, value] of items) {
    _log().default.log(tableFormat(key, value));
  }
}
//# sourceMappingURL=updateTSConfig.js.map