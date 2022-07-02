"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonEmptyInput = nonEmptyInput;
exports.promptsNonEmptyInput = exports.promptsExistingFile = void 0;

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nonEmptyInput(val) {
  return val !== '';
} // note(cedric): export prompts-compatible validators,
// refactor when prompt is replaced with prompts


const promptsNonEmptyInput = nonEmptyInput;
exports.promptsNonEmptyInput = promptsNonEmptyInput;

const promptsExistingFile = async filePath => {
  try {
    const stats = await _fs().default.promises.stat(filePath);

    if (stats.isFile()) {
      return true;
    }

    return 'Input is not a file.';
  } catch {
    return 'File does not exist.';
  }
};

exports.promptsExistingFile = promptsExistingFile;
//# sourceMappingURL=validators.js.map