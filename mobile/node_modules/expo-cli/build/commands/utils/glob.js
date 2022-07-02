"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.anyMatchAsync = anyMatchAsync;
exports.everyMatchAsync = everyMatchAsync;
exports.wrapGlobWithTimeout = wrapGlobWithTimeout;

function _glob() {
  const data = require("glob");

  _glob = function () {
    return data;
  };

  return data;
}

function everyMatchAsync(pattern, options) {
  return new Promise((resolve, reject) => {
    const g = new (_glob().Glob)(pattern, options);
    let called = false;

    const callback = (er, matched) => {
      if (called) return;
      called = true;
      if (er) reject(er);else resolve(matched);
    };

    g.on('error', callback);
    g.on('end', matches => callback(null, matches));
  });
}

function anyMatchAsync(pattern, options) {
  return new Promise((resolve, reject) => {
    const g = new (_glob().Glob)(pattern, options);
    let called = false;

    const callback = (er, matched) => {
      if (called) return;
      called = true;
      if (er) reject(er);else resolve(matched);
    };

    g.on('error', callback);
    g.on('match', matched => {
      // We've disabled using abort as it breaks the entire glob package across all instances.
      // https://github.com/isaacs/node-glob/issues/279 & https://github.com/isaacs/node-glob/issues/342
      // For now, just collect every match.
      // g.abort();
      callback(null, [matched]);
    });
    g.on('end', matches => callback(null, matches));
  });
}

function wrapGlobWithTimeout(query, duration) {
  return new Promise(async (resolve, reject) => {
    // Wait some time, then escape...
    // Adding this because glob can sometimes freeze and fail to resolve if any other glob uses `.abort()`.
    const timeout = setTimeout(() => {
      resolve(false);
    }, duration);
    process.on('SIGINT', () => clearTimeout(timeout));

    try {
      resolve(await query());
    } catch (error) {
      reject(error);
    } finally {
      clearTimeout(timeout);
    }
  });
}
//# sourceMappingURL=glob.js.map