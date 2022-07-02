"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProgressTracker = createProgressTracker;

function _progress() {
  const data = _interopRequireDefault(require("progress"));

  _progress = function () {
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

function createProgressTracker(_total) {
  let bar = null;
  let transferredSoFar = 0;
  return progress => {
    if (!bar && (progress.total !== undefined || _total !== undefined)) {
      const total = _total !== null && _total !== void 0 ? _total : progress.total;
      bar = new (_progress().default)('[:bar] :percent :etas', {
        complete: '=',
        incomplete: ' ',
        total,
        width: 64
      });

      _log().default.setBundleProgressBar(bar);
    }

    if (bar) {
      bar.tick(progress.transferred - transferredSoFar);
    }

    transferredSoFar = progress.transferred;
  };
}
//# sourceMappingURL=progress.js.map