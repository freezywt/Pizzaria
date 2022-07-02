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

function _default(program) {
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('publish [path]').alias('p').description('Deploy a project to Expo hosting').helpGroup('publish').option('-q, --quiet', 'Suppress verbose output from the Metro bundler.').option('-s, --send-to [dest]', 'A phone number or email address to send a link to').option('-c, --clear', 'Clear the Metro bundler cache').option('-t, --target <managed|bare>', 'Target environment for which this publish is intended. Options are `managed` or `bare`.') // TODO(anp) set a default for this dynamically based on whether we're inside a container?
  .option('--max-workers <num>', 'Maximum number of tasks to allow Metro to spawn.').option('--release-channel <name>', "The release channel to publish to. Default is 'default'.", 'default'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./publishAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('publish:set [path]').alias('ps').description('Specify the channel to serve a published release').helpGroup('publish').option('-c, --release-channel <name>', 'The channel to set the published release. (Required)').option('-p, --publish-id <publish-id>', 'The id of the published release to serve from the channel. (Required)'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./publishSetAsync'))), {
    checkConfig: true
  });
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('publish:rollback [path]').alias('pr').description('Undo an update to a channel').helpGroup('publish').option('--channel-id <channel-id>', 'This flag is deprecated.').option('-c, --release-channel <name>', 'The channel to rollback from. (Required)').option('-s, --sdk-version <version>', 'The sdk version to rollback. (Required)').option('-p, --platform <android|ios>', 'The platform to rollback.'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./publishRollbackAsync'))), {
    checkConfig: true
  });
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('publish:history [path]').alias('ph').description("Log the project's releases").helpGroup('publish').option('-c, --release-channel <name>', 'Filter by release channel. If this flag is not included, the most recent publications will be shown.').option('--count <number-of-logs>', 'Number of logs to view, maximum 100, default 5.', parseInt).option('-p, --platform <android|ios>', 'Filter by platform, android or ios. Defaults to both platforms.').option('-s, --sdk-version <version>', 'Filter by SDK version e.g. 35.0.0').option('-r, --raw', 'Produce some raw output.'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./publishHistoryAsync'))), {
    checkConfig: true
  });
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('publish:details [path]').alias('pd').description('Log details of a published release').helpGroup('publish').option('--publish-id <publish-id>', 'Publication id. (Required)').option('-r, --raw', 'Produce some raw output.'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./publishDetailsAsync'))), {
    checkConfig: true
  });
}
//# sourceMappingURL=publish.js.map