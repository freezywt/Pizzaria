"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fallbackToTextAndUrl = fallbackToTextAndUrl;
exports.fallbackToUrl = fallbackToUrl;
exports.learnMore = learnMore;
exports.linkedText = linkedText;
exports.transporterAppLink = transporterAppLink;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * When linking isn't available, fallback to displaying the URL beside the
 * text in parentheses.
 *
 * @example [Expo](https://expo.dev)
 * @example Expo (https://expo.dev)
 *
 * @param value
 * @param url
 */
function fallbackToTextAndUrl(text, url) {
  return (0, _terminalLink().default)(text, url);
}
/**
 * When linking isn't available, fallback to just displaying the URL.
 *
 * @example [value](https://expo.dev)
 * @example https://expo.dev
 *
 * @param text
 * @param url
 */


function fallbackToUrl(text, url) {
  return (0, _terminalLink().default)(text, url, {
    fallback: (_, url) => url
  });
}
/**
 * When linking isn't available, format the learn more link better.
 *
 * @example [Learn more](https://expo.dev)
 * @example Learn more: https://expo.dev
 * @param url
 */


function learnMore(url) {
  return (0, _terminalLink().default)(_chalk().default.underline('Learn more.'), url, {
    fallback: (text, url) => `Learn more: ${_chalk().default.underline(url)}`
  });
}

function linkedText(text, url) {
  return (0, _terminalLink().default)(text, url, {
    fallback: (text, url) => {
      return `${text} ${_chalk().default.dim.underline(url)}`;
    }
  });
}

function transporterAppLink() {
  return fallbackToTextAndUrl('Transporter.app', 'https://apps.apple.com/us/app/transporter/id1450874784');
}
//# sourceMappingURL=TerminalLink.js.map