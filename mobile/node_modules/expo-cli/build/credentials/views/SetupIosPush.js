"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SetupIosPush = void 0;

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
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

function _prompts() {
  const data = require("../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function iosPushView() {
  const data = _interopRequireWildcard(require("./IosPushCredentials"));

  iosPushView = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SetupIosPush {
  constructor(app) {
    this.app = app;
  }

  async open(ctx) {
    var _appCredentials$crede, _appCredentials$crede2, _appCredentials$crede3;

    if (!ctx.user) {
      throw new Error(`This workflow requires you to be logged in.`);
    } // TODO: Remove this on Nov 2020 when Apple no longer accepts deprecated push certs


    const appCredentials = await ctx.ios.getAppCredentials(this.app);
    const deprecatedPushId = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede = appCredentials.credentials) === null || _appCredentials$crede === void 0 ? void 0 : _appCredentials$crede.pushId;
    const deprecatedPushP12 = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede2 = appCredentials.credentials) === null || _appCredentials$crede2 === void 0 ? void 0 : _appCredentials$crede2.pushP12;
    const deprecatedPushPassword = appCredentials === null || appCredentials === void 0 ? void 0 : (_appCredentials$crede3 = appCredentials.credentials) === null || _appCredentials$crede3 === void 0 ? void 0 : _appCredentials$crede3.pushPassword;

    if (deprecatedPushId && deprecatedPushP12 && deprecatedPushPassword) {
      if (ctx.nonInteractive) {
        throw new (_CommandError().default)('NON_INTERACTIVE', "We've detected legacy Push Certificates on file. Start the CLI without the '--non-interactive' flag to upgrade to the newer standard.");
      }

      const confirm = await (0, _prompts().confirmAsync)({
        message: `We've detected legacy Push Certificates on file. Would you like to upgrade to the newer standard?`
      });

      if (!confirm) {
        _log().default.log(`Using Deprecated Push Cert: ${deprecatedPushId} on file`);

        return null;
      }
    }

    const configuredPushKey = await ctx.ios.getPushKey(this.app);

    if (configuredPushKey) {
      // we dont need to setup if we have a valid push key on file
      const isValid = await iosPushView().validatePushKey(ctx, configuredPushKey);

      if (isValid) {
        return null;
      }
    }

    return new (iosPushView().CreateOrReusePushKey)(this.app);
  }

}

exports.SetupIosPush = SetupIosPush;
//# sourceMappingURL=SetupIosPush.js.map