"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _SetupAndroidKeystore() {
  const data = require("../../credentials/views/SetupAndroidKeystore");

  _SetupAndroidKeystore = function () {
    return data;
  };

  return data;
}

function _getOrPromptApplicationId() {
  const data = require("../utils/getOrPromptApplicationId");

  _getOrPromptApplicationId = function () {
    return data;
  };

  return data;
}

function _BaseBuilder() {
  const data = _interopRequireDefault(require("./BaseBuilder"));

  _BaseBuilder = function () {
    return data;
  };

  return data;
}

function _BuildError() {
  const data = _interopRequireDefault(require("./BuildError"));

  _BuildError = function () {
    return data;
  };

  return data;
}

function _constants() {
  const data = require("./constants");

  _constants = function () {
    return data;
  };

  return data;
}

function utils() {
  const data = _interopRequireWildcard(require("./utils"));

  utils = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ANDROID
} = _constants().PLATFORMS;

class AndroidBuilder extends _BaseBuilder().default {
  async run() {
    // This gets run after all other validation to prevent users from having to answer this question multiple times.
    this.options.type = await utils().askBuildType(this.options.type, {
      apk: 'Build a package to deploy to the store or install directly on Android devices',
      'app-bundle': 'Build an optimized bundle for the store'
    }); // Check SplashScreen images sizes

    await _xdl().Android.checkSplashScreenImages(this.projectDir); // Check the status of any current builds

    await this.checkForBuildInProgress(); // Check for existing credentials, collect any missing credentials, and validate them

    await this.collectAndValidateCredentials(); // Publish the current experience, if necessary

    const publishedExpIds = this.options.publicUrl ? undefined : await this.ensureReleaseExists();

    if (!this.options.publicUrl) {
      await this.checkStatusBeforeBuild();
    } // Initiate a build


    await this.build(publishedExpIds);
  }

  async checkProjectConfig() {
    // Run this first because the error messages are related
    // to ExpoKit which is harder to change than the bundle ID.
    await super.checkProjectConfig();
    await utils().checkIfSdkIsSupported(this.manifest.sdkVersion, ANDROID); // Check the android package name

    await (0, _getOrPromptApplicationId().getOrPromptForPackage)(this.projectDir);
    this.updateProjectConfig();
  }

  platform() {
    return ANDROID;
  }

  async collectAndValidateCredentials() {
    var _this$options$parent;

    const nonInteractive = (_this$options$parent = this.options.parent) === null || _this$options$parent === void 0 ? void 0 : _this$options$parent.nonInteractive;
    const skipCredentialsCheck = this.options.skipCredentialsCheck === true;
    const ctx = new (_credentials().Context)();
    await ctx.init(this.projectDir, {
      nonInteractive
    });
    const experienceName = `@${ctx.projectOwner}/${ctx.manifest.slug}`;

    if (this.options.clearCredentials) {
      if (nonInteractive) {
        throw new (_BuildError().default)('Clearing your Android build credentials from our build servers is a PERMANENT and IRREVERSIBLE action, it\'s not supported when combined with the "--non-interactive" option');
      }

      await (0, _route().runCredentialsManager)(ctx, new (_AndroidKeystore().RemoveKeystore)(experienceName));
    }

    const paramKeystore = await (0, _AndroidKeystore().getKeystoreFromParams)(this.options);

    if (paramKeystore) {
      await (0, _AndroidKeystore().useKeystore)(ctx, {
        experienceName,
        keystore: paramKeystore,
        skipKeystoreValidation: skipCredentialsCheck
      });
    } else {
      await (0, _route().runCredentialsManager)(ctx, new (_SetupAndroidKeystore().SetupAndroidKeystore)(experienceName, {
        nonInteractive,
        allowMissingKeystore: true,
        skipKeystoreValidation: skipCredentialsCheck
      }));
    }
  }

}

exports.default = AndroidBuilder;
//# sourceMappingURL=AndroidBuilder.js.map