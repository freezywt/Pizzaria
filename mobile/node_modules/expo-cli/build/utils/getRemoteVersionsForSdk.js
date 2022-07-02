"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRemoteVersionsForSdk = void 0;

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

const getRemoteVersionsForSdk = async sdkVersion => {
  const {
    sdkVersions
  } = await _xdl().Versions.versionsAsync({
    skipCache: true
  });

  if (sdkVersion && sdkVersion in sdkVersions) {
    const {
      relatedPackages,
      facebookReactVersion,
      facebookReactNativeVersion
    } = sdkVersions[sdkVersion];
    const reactVersion = facebookReactVersion ? {
      react: facebookReactVersion,
      'react-dom': facebookReactVersion
    } : undefined;
    return { ...relatedPackages,
      ...reactVersion,
      'react-native': facebookReactNativeVersion
    };
  }

  return {};
};

exports.getRemoteVersionsForSdk = getRemoteVersionsForSdk;
//# sourceMappingURL=getRemoteVersionsForSdk.js.map