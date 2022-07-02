"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTemplateOption = resolveTemplateOption;

function fs() {
  const data = _interopRequireWildcard(require("fs"));

  fs = function () {
    return data;
  };

  return data;
}

function path() {
  const data = _interopRequireWildcard(require("path"));

  path = function () {
    return data;
  };

  return data;
}

function _UrlUtils() {
  const data = require("xdl/build/UrlUtils");

  _UrlUtils = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function resolveTemplateOption(template) {
  if ((0, _UrlUtils().isURL)(template, {})) {
    return template;
  }

  if (template.startsWith(`.${path().sep}`) || template.startsWith(path().sep)) {
    const templatePath = path().resolve(template);

    if (!fs().existsSync(templatePath)) {
      throw new (_CommandError().default)('template file does not exist: ' + templatePath);
    }

    if (!fs().statSync(templatePath).isFile()) {
      throw new (_CommandError().default)('template must be a tar file created by running `npm pack` in a project: ' + templatePath);
    }

    return templatePath;
  }

  return template;
}
//# sourceMappingURL=resolveTemplate.js.map