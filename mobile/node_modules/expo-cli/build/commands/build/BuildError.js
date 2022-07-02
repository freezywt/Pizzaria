"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class BuildError extends Error {
  constructor(message) {
    super();
    this.message = message;

    _defineProperty(this, "name", 'BuildError');
  }

}

exports.default = BuildError;
//# sourceMappingURL=BuildError.js.map