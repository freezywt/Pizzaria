"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = program => {
  const deprecatedHelp = value => _chalk().default.yellow`Deprecated: ` + value;

  program.command('start [path]').alias('r').description('Start a local dev server for the app').helpGroup('core').option('-s, --send-to [dest]', 'An email address to send a link to').option('-c, --clear', 'Clear the Metro bundler cache') // TODO(anp) set a default for this dynamically based on whether we're inside a container?
  .option('--max-workers <num>', 'Maximum number of tasks to allow Metro to spawn.').option('--no-dev', 'Turn development mode off').option('--minify', 'Minify code').option('--https', 'To start webpack with https protocol').option('--force-manifest-type <manifest-type>', 'Override auto detection of manifest type').option('-p, --port <port>', 'Port to start the native Metro bundler on (does not apply to web or tunnel). Default: 19000').urlOpts().allowOffline().option('--dev', deprecatedHelp('Dev mode is used by default')).option('--no-minify', deprecatedHelp('Minify is disabled by default')).option('--no-https', deprecatedHelp('https is disabled by default')).asyncActionProjectDir(async (projectRoot, options) => {
    const {
      normalizeOptionsAsync
    } = await Promise.resolve().then(() => _interopRequireWildcard(require('./start/parseStartOptions')));
    const normalizedOptions = await normalizeOptionsAsync(projectRoot, options);
    const {
      actionAsync
    } = await Promise.resolve().then(() => _interopRequireWildcard(require('./start/startAsync')));
    return await actionAsync(projectRoot, normalizedOptions);
  });
  program.command('start:web [path]').alias('web').description('Start a Webpack dev server for the web app').helpGroup('core').option('--no-dev', 'Turn development mode off').option('--minify', 'Minify code').option('--https', 'To start webpack with https protocol').option('--force-manifest-type <manifest-type>', 'Override auto detection of manifest type').option('-p, --port <port>', 'Port to start the Webpack bundler on. Default: 19006').option('-s, --send-to [dest]', 'An email address to send a link to').urlOpts().allowOffline().option('--dev', deprecatedHelp('Dev mode is used by default')).option('--no-minify', deprecatedHelp('Minify is disabled by default')).option('--no-https', deprecatedHelp('https is disabled by default')).asyncActionProjectDir(async (projectRoot, options) => {
    const {
      normalizeOptionsAsync
    } = await Promise.resolve().then(() => _interopRequireWildcard(require('./start/parseStartOptions')));
    const normalizedOptions = await normalizeOptionsAsync(projectRoot, { ...options,
      webOnly: true
    });
    const {
      actionAsync
    } = await Promise.resolve().then(() => _interopRequireWildcard(require('./start/startAsync')));
    return await actionAsync(projectRoot, normalizedOptions);
  });
};

exports.default = _default;
//# sourceMappingURL=start.js.map