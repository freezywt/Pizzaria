"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gitStatusAsync = gitStatusAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function gitStatusAsync({
  showUntracked
} = {}) {
  return (await (0, _spawnAsync().default)('git', ['status', '-s', showUntracked ? '-uall' : '-uno'])).stdout;
}
//# sourceMappingURL=git.js.map