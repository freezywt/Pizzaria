"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseTSConfigName = void 0;
exports.collectMissingPackages = collectMissingPackages;
exports.hasTSConfig = hasTSConfig;
exports.queryFirstProjectTypeScriptFileAsync = queryFirstProjectTypeScriptFileAsync;
exports.resolveBaseTSConfig = resolveBaseTSConfig;

function _fsExtra() {
  const data = require("fs-extra");

  _fsExtra = function () {
    return data;
  };

  return data;
}

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
    return data;
  };

  return data;
}

function _resolveFrom() {
  const data = _interopRequireDefault(require("resolve-from"));

  _resolveFrom = function () {
    return data;
  };

  return data;
}

function _glob() {
  const data = require("../glob");

  _glob = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function fileExistsAsync(file) {
  var _await$stat$catch$isF, _await$stat$catch;

  return (_await$stat$catch$isF = (_await$stat$catch = await (0, _fsExtra().stat)(file).catch(() => null)) === null || _await$stat$catch === void 0 ? void 0 : _await$stat$catch.isFile()) !== null && _await$stat$catch$isF !== void 0 ? _await$stat$catch$isF : false;
}

const requiredPackages = [// use typescript/package.json to skip node module cache issues when the user installs
// the package and attempts to resolve the module in the same process.
{
  file: 'typescript/package.json',
  pkg: 'typescript'
}, {
  file: '@types/react/index.d.ts',
  pkg: '@types/react'
}, {
  file: '@types/react-native/index.d.ts',
  pkg: '@types/react-native'
}];
const baseTSConfigName = 'expo/tsconfig.base';
exports.baseTSConfigName = baseTSConfigName;

async function queryFirstProjectTypeScriptFileAsync(projectRoot) {
  var _results$;

  const results = await (0, _glob().wrapGlobWithTimeout)(() => (0, _glob().everyMatchAsync)('**/*.@(ts|tsx)', {
    cwd: projectRoot,
    ignore: ['**/@(Carthage|Pods|node_modules)/**', '**/*.d.ts', '@(ios|android|web|web-build|dist)/**']
  }), 5000);

  if (results === false) {
    return null;
  }

  return (_results$ = results[0]) !== null && _results$ !== void 0 ? _results$ : null;
}

function resolveBaseTSConfig(projectRoot) {
  var _resolveFrom$silent;

  return (_resolveFrom$silent = _resolveFrom().default.silent(projectRoot, 'expo/tsconfig.base.json')) !== null && _resolveFrom$silent !== void 0 ? _resolveFrom$silent : null;
}

async function hasTSConfig(projectRoot) {
  const tsConfigPath = path().join(projectRoot, 'tsconfig.json');

  if (await fileExistsAsync(tsConfigPath)) {
    return tsConfigPath;
  }

  return null;
}

function collectMissingPackages(projectRoot) {
  const resolutions = {};
  const missingPackages = requiredPackages.filter(p => {
    try {
      resolutions[p.pkg] = (0, _resolveFrom().default)(projectRoot, p.file);
      return false;
    } catch {
      return true;
    }
  });
  return {
    missing: missingPackages,
    resolutions
  };
}
//# sourceMappingURL=resolveModules.js.map