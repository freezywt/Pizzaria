"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _applyAsyncAction() {
  const data = require("../utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function collect(val, memo) {
  memo.push(val);
  return memo;
}

function _default(program) {
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('export [path]').description('Export the static files of the app for hosting it on a web server').helpGroup('core').option('--platform <all|android|ios>', 'Platforms: android, ios, all', 'all').option('-p, --public-url <url>', 'The public url that will host the static files (required)').option('-c, --clear', 'Clear the Metro bundler cache').option('--output-dir <dir>', 'The directory to export the static files to', 'dist').option('-a, --asset-url <url>', 'The absolute or relative url that will host the asset files', './assets').option('-d, --dump-assetmap', 'Dump the asset map for further processing').option('--dev', 'Configure static files for developing locally using a non-https server').option('-s, --dump-sourcemap', 'Dump the source map for debugging the JS bundle').option('-q, --quiet', 'Suppress verbose output').option('-t, --target <managed|bare>', 'Target environment for which this export is intended').option('--merge-src-dir <dir>', 'A repeatable source dir to merge in', collect, []).option('--merge-src-url <url>', 'A repeatable source tar.gz file URL to merge in', collect, []).option('--max-workers <num>', 'Maximum number of tasks to allow Metro to spawn').option('--experimental-bundle', 'export bundles for use with EAS updates'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./exportAsync'))), {
    checkConfig: true
  });
}
//# sourceMappingURL=export.js.map