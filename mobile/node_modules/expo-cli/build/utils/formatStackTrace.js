"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatStackTrace = formatStackTrace;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStringBetweenParens(value) {
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(value);

  if (matches && (matches === null || matches === void 0 ? void 0 : matches.length) > 1) {
    return matches[1];
  }

  return value;
}

function focusLastPathComponent(value) {
  const parts = value.split('/');

  if (parts.length > 1) {
    const last = parts.pop();

    const current = _chalk().default.dim(parts.join('/') + '/');

    return `${current}${last}`;
  }

  return _chalk().default.dim(value);
}

function formatStackTrace(stacktrace, command) {
  const treeStackLines = [];

  for (const line of stacktrace.split('\n')) {
    const [first, ...parts] = line.trim().split(' '); // Remove at -- we'll use a branch instead.

    if (first === 'at') {
      treeStackLines.push(parts);
    }
  }

  return treeStackLines.map((parts, index) => {
    var _first, _first2, _first3;

    let first = parts.shift();
    let last = parts.pop(); // Replace anonymous with command name

    if (first === 'Command.<anonymous>') {
      first = _chalk().default.bold(`expo ${command}`);
    } else if ((_first = first) !== null && _first !== void 0 && _first.startsWith('Object.')) {
      // Remove extra JS types from function names
      first = first.split('Object.').pop();
    } else if ((_first2 = first) !== null && _first2 !== void 0 && _first2.startsWith('Function.')) {
      // Remove extra JS types from function names
      first = first.split('Function.').pop();
    } else if ((_first3 = first) !== null && _first3 !== void 0 && _first3.startsWith('/')) {
      // If the first element is a path
      first = focusLastPathComponent(getStringBetweenParens(first));
    }

    if (last) {
      last = focusLastPathComponent(getStringBetweenParens(last));
    }

    const branch = (index === treeStackLines.length - 1 ? '└' : '├') + '─';
    return ['   ', branch, first, ...parts, last].filter(Boolean).join(' ');
  }).join('\n');
}
//# sourceMappingURL=formatStackTrace.js.map