"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function fs() {
  const data = _interopRequireWildcard(require("fs-extra"));

  fs = function () {
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

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _credentials() {
  const data = require("../../credentials");

  _credentials = function () {
    return data;
  };

  return data;
}

function _route() {
  const data = require("../../credentials/route");

  _route = function () {
    return data;
  };

  return data;
}

function _AndroidKeystore() {
  const data = require("../../credentials/views/AndroidKeystore");

  _AndroidKeystore = function () {
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

function _utils() {
  const data = require("./utils");

  _utils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

async function actionAsync(projectRoot, options) {
  var _options$parent;

  const ctx = new (_credentials().Context)();
  await ctx.init(projectRoot, {
    nonInteractive: (_options$parent = options.parent) === null || _options$parent === void 0 ? void 0 : _options$parent.nonInteractive
  });
  const outputPath = path().resolve(projectRoot, `${ctx.manifest.slug}.tmp.jks`);

  try {
    (0, _utils().assertSlug)(ctx.manifest.slug);
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;
    const view = new (_AndroidKeystore().DownloadKeystore)(experienceName, {
      outputPath,
      quiet: true
    });
    await (0, _route().runCredentialsManager)(ctx, view);
    const keystore = await ctx.android.fetchKeystore(experienceName);

    if (keystore) {
      await _xdl().AndroidCredentials.logKeystoreHashes({
        keystorePath: outputPath,
        keystorePassword: keystore.keystorePassword,
        keyAlias: keystore.keyAlias,
        keyPassword: keystore.keyPassword
      });

      _log().default.log(`\nNote: if you are using Google Play signing, this app will be signed with a different key after publishing to the store, and you'll need to use the hashes displayed in the Google Play console.`);
    } else {
      _log().default.warn('There is no valid Keystore defined for this app');
    }
  } finally {
    await fs().remove(outputPath);
  }
}
//# sourceMappingURL=fetchAndroidHashesAsync.js.map