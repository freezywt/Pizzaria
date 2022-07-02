"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertHTMLToASCII = convertHTMLToASCII;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _terminalLink() {
  const data = _interopRequireDefault(require("terminal-link"));

  _terminalLink = function () {
    return data;
  };

  return data;
}

function _turndown() {
  const data = _interopRequireDefault(require("turndown"));

  _turndown = function () {
    return data;
  };

  return data;
}

function _wrapAnsi() {
  const data = _interopRequireDefault(require("wrap-ansi"));

  _wrapAnsi = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-ignore
const turndownServices = {};

function getService(rootUrl) {
  if (turndownServices[rootUrl]) {
    return turndownServices[rootUrl];
  }

  const turndownService = new (_turndown().default)();
  turndownService.addRule('strikethrough', {
    filter: ['del', 's', 'strike'],

    replacement(content) {
      return _chalk().default.strikethrough(content);
    }

  });
  turndownService.addRule('strong', {
    filter: ['strong', 'b'],

    replacement(content) {
      return _chalk().default.bold(content);
    }

  });
  turndownService.addRule('emphasis', {
    filter: ['em', 'i'],

    replacement(content) {
      return _chalk().default.italic(content);
    }

  });
  turndownService.addRule('heading', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

    replacement(content) {
      return '\n' + _chalk().default.bold(content) + '\n';
    }

  });
  turndownService.addRule('inlineLink', {
    filter(node, options) {
      return options.linkStyle === 'inlined' && node.nodeName === 'A' && node.getAttribute('href');
    },

    replacement(content, node) {
      let href = node.getAttribute('href');
      if (href.startsWith('/')) href = `${rootUrl}${href}`;

      if (_terminalLink().default.isSupported) {
        return _chalk().default.cyan((0, _terminalLink().default)(content, href));
      }

      return `${_chalk().default.cyan(content)} (${_chalk().default.underline(href)})`;
    }

  });
  turndownServices[rootUrl] = turndownService;
  return turndownService;
}

function convertHTMLToASCII({
  content,
  rootUrl
}) {
  const service = getService(rootUrl);
  return (0, _wrapAnsi().default)(service.turndown(content), process.stdout.columns || 80);
}
//# sourceMappingURL=convertHTMLToASCII.js.map