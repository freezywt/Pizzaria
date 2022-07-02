"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractAndPrepareTemplateAppAsync = extractAndPrepareTemplateAppAsync;

function _jsonFile() {
  const data = _interopRequireDefault(require("@expo/json-file"));

  _jsonFile = function () {
    return data;
  };

  return data;
}

function _merge() {
  const data = _interopRequireDefault(require("lodash/merge"));

  _merge = function () {
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

function _npm() {
  const data = require("./npm");

  _npm = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extract a template app to a given file path and clean up any properties left over from npm to
 * prepare it for usage.
 */
async function extractAndPrepareTemplateAppAsync(npmPackageName, projectRoot, config) {
  var _ref, _config$name;

  const name = (_ref = (_config$name = config.name) !== null && _config$name !== void 0 ? _config$name : config.expo.name) !== null && _ref !== void 0 ? _ref : 'app';
  await (0, _npm().downloadAndExtractNpmModuleAsync)(npmPackageName, {
    cwd: projectRoot,
    name
  });
  const appFile = new (_jsonFile().default)(_path().default.join(projectRoot, 'app.json'));
  const appJson = (0, _merge().default)(await appFile.readAsync(), config);
  await appFile.writeAsync(appJson);
  await preparePackageJsonAsync(projectRoot, name);
  return projectRoot;
}
/** Modify the template package.json, removing any extra fields and adding known properties. */


async function preparePackageJsonAsync(projectRoot, appName) {
  const packageFile = new (_jsonFile().default)(_path().default.join(projectRoot, 'package.json'));
  const packageJson = await packageFile.readAsync(); // Remove unused properties from package.json first.

  delete packageJson.description;
  delete packageJson.tags;
  delete packageJson.repository; // name and version are required for yarn workspaces (monorepos)

  packageJson.name = (0, _npm().sanitizeNpmPackageName)(appName); // These are metadata fields related to the template package, let's remove them from the package.json.
  // A good place to start

  packageJson.version = '1.0.0';
  packageJson.private = true;
  await packageFile.writeAsync(packageJson);
}
//# sourceMappingURL=extractTemplateAppAsync.js.map