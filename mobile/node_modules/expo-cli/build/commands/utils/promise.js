"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;

/**
 * Returns a promise that will be resolved after given ms milliseconds.
 *
 * @param ms A number of milliseconds to sleep.
 * @returns A promise that resolves after the provided number of milliseconds.
 */
async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}
//# sourceMappingURL=promise.js.map