"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getVersionsAsync = getVersionsAsync;
exports.getReleasedVersionsAsync = getReleasedVersionsAsync;
var _env = require("../utils/env");
var _errors = require("../utils/errors");
var _obj = require("../utils/obj");
var _client = require("./rest/client");
async function getVersionsAsync({ skipCache  } = {}) {
    // Reconstruct the cached fetch since caching could be disabled.
    const fetchAsync = (0, _client).createCachedFetch({
        skipCache,
        cacheDirectory: "versions-cache",
        // We'll use a 1 week cache for versions so older versions get flushed out eventually.
        ttl: 1000 * 60 * 60 * 24 * 7
    });
    const results = await fetchAsync("versions/latest");
    if (!results.ok) {
        throw new _errors.CommandError("API", `Unexpected response when fetching version info from Expo servers: ${results.statusText}.`);
    }
    const json = await results.json();
    return json.data;
}
async function getReleasedVersionsAsync({ skipCache  } = {}) {
    // NOTE(brentvatne): it is possible for an unreleased version to be published to
    // the versions endpoint, but in some cases we only want to list out released
    // versions
    const { sdkVersions  } = await getVersionsAsync({
        skipCache
    });
    return (0, _obj).pickBy(sdkVersions, (data, _sdkVersionString)=>!!data.releaseNoteUrl || _env.env.EXPO_BETA && data.beta
    );
}

//# sourceMappingURL=getVersions.js.map