"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _applyAsyncAction() {
  const data = require("./utils/applyAsyncAction");

  _applyAsyncAction = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(program) {
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('webhooks [path]').helpGroup('webhooks').description('List all webhooks for a project'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./webhooks/webhooksAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('webhooks:add [path]').helpGroup('webhooks').description('Add a webhook to a project').option('--url <url>', 'URL to request. (Required)').option('--event <event-type>', 'Event type that triggers the webhook. [build] (Required)').option('--secret <secret>', "Secret used to create a hash signature of the request payload, provided in the 'Expo-Signature' header."), () => Promise.resolve().then(() => _interopRequireWildcard(require('./webhooks/webhooksAddAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('webhooks:remove [path]').helpGroup('webhooks').option('--id <id>', 'ID of the webhook to remove.').description('Delete a webhook'), () => Promise.resolve().then(() => _interopRequireWildcard(require('./webhooks/webhooksRemoveAsync'))));
  (0, _applyAsyncAction().applyAsyncActionProjectDir)(program.command('webhooks:update [path]').helpGroup('webhooks').description('Update an existing webhook').option('--id <id>', 'ID of the webhook to update.').option('--url [url]', 'URL the webhook will request.').option('--event [event-type]', 'Event type that triggers the webhook. [build]').option('--secret [secret]', "Secret used to create a hash signature of the request payload, provided in the 'Expo-Signature' header."), () => Promise.resolve().then(() => _interopRequireWildcard(require('./webhooks/webhooksUpdateAsync'))));
}
//# sourceMappingURL=webhooks.js.map