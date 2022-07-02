"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guessEditor = guessEditor;
exports.openInEditorAsync = openInEditorAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _envEditor() {
  const data = _interopRequireDefault(require("env-editor"));

  _envEditor = function () {
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

function guessEditor() {
  try {
    return _envEditor().default.defaultEditor();
  } catch {
    return _envEditor().default.getEditor('vscode');
  }
}

async function openInEditorAsync(path, options = {}) {
  const editor = options.editor ? _envEditor().default.getEditor(options.editor) : guessEditor();

  _log().default.debug(`Opening ${path} in ${editor.name} (bin: ${editor.binary}, id: ${editor.id})`);

  if (editor) {
    try {
      await (0, _spawnAsync().default)(editor.binary, [path]);
      return true;
    } catch {}
  }

  if (options.editor) {
    _log().default.error(`Could not resolve editor from environment variable $EXPO_EDITOR="${options.editor}". Trying again with system default.`);

    return openInEditorAsync(path, {});
  }

  _log().default.error('Could not open editor, you can set it by defining the $EDITOR environment variable with the binary of your editor. (e.g. "code" or "atom")');

  return false;
}
//# sourceMappingURL=openInEditorAsync.js.map