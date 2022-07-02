"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileMethod = void 0;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a method and profile the time it takes to execute the method using `EXPO_PROFILE`.
 * Works best with named functions (i.e. not arrow functions).
 *
 * @param fn
 * @param functionName
 */
const profileMethod = (fn, functionName) => {
  const name = _chalk().default.dim(`⏱  [profile] ${functionName !== null && functionName !== void 0 ? functionName : fn.name || 'unknown'}`);

  return (...args) => {
    _log().default.time(name);

    const results = fn(...args);

    if (results instanceof Promise) {
      // @ts-ignore
      return new Promise((resolve, reject) => {
        results.then(results => {
          resolve(results);

          _log().default.timeEnd(name);
        }).catch(error => {
          reject(error);

          _log().default.timeEnd(name);
        });
      });
    } else {
      _log().default.timeEnd(name);
    }

    return results;
  };
};

exports.profileMethod = profileMethod;
//# sourceMappingURL=profileMethod.js.map