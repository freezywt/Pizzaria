"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertContractMessagesAsync = assertContractMessagesAsync;
exports.formatContractMessage = formatContractMessage;

function _appleUtils() {
  const data = require("@expo/apple-utils");

  _appleUtils = function () {
    return data;
  };

  return data;
}

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _convertHTMLToASCII() {
  const data = require("./convertHTMLToASCII");

  _convertHTMLToASCII = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getContractStatusAsync(context) {
  try {
    var _capabilities$contrac;

    const capabilities = await _appleUtils().ITCAgreements.getCapabilitiesAsync(context);
    return (_capabilities$contrac = capabilities === null || capabilities === void 0 ? void 0 : capabilities.contractStatus) !== null && _capabilities$contrac !== void 0 ? _capabilities$contrac : null;
  } catch (error) {
    _log().default.warn(`Failed to get iTunes contract status: ${error.message}`);

    return null;
  }
}

async function getContractMessagesAsync(context) {
  try {
    return await _appleUtils().ITCAgreements.getContractMessagesAsync(context);
  } catch (error) {
    _log().default.warn(`Failed to get iTunes contract messages: ${error.message}`);

    return null;
  }
}

async function getRequiredContractMessagesAsync(context) {
  var _await$getContractMes2;

  // This emulates the check that's performed on the ASC website's "apps"
  // page before presenting the (+) create app button.
  const status = await getContractStatusAsync(context);

  if (status) {
    if (['FREE_APP_AGREEMENT_ACTIVE', 'PAID_APP_AGREEMENT_ACTIVE'].includes(status)) {
      // The user can freely create an app, no contracts need to be accepted.
      // No need to check for messages because afaict no vital messages will be present.
      return {
        messages: [],
        isFatal: false
      };
    } else if (['FREE_APP_AGREEMENT_OUTDATED', 'PAID_APP_AGREEMENT_OUTDATED', 'EXPIRED_MEMBERSHIP'].includes(status)) {
      var _await$getContractMes;

      // The user cannot create an app until they've reviewed, and agreed to the updated agreements
      // or renewed their membership on ASC.
      // Get the exact messages from ASC to show the user a useful message.
      return {
        messages: (_await$getContractMes = await getContractMessagesAsync(context)) !== null && _await$getContractMes !== void 0 ? _await$getContractMes : [],
        isFatal: true
      };
    }
  } // The contract messages aren't documented so if a new one is present we cannot be sure if it's fatal or not.
  // This will check for messages, if none exist, then the process will continue.
  // Otherwise messages will be present and the process will stop.
  // There is a small chance that this could result in a false positive if the messages are extraneous, so we'll also
  // prompt the user to open an issue so we can address the new contract state if it ever appears.
  // TODO: Maybe a silent analytic would be better


  _log().default.error(`\nUnexpected Apple developer contract status "${status}". Please open an issue on https://github.com/expo/eas-cli`);

  _log().default.newLine();

  return {
    messages: (_await$getContractMes2 = await getContractMessagesAsync(context)) !== null && _await$getContractMes2 !== void 0 ? _await$getContractMes2 : [],
    isFatal: false
  };
}

const rootUrl = 'https://appstoreconnect.apple.com';

function formatContractMessage(message) {
  return (0, _convertHTMLToASCII().convertHTMLToASCII)({
    content: '\u203A ' + [message.subject && `<b>${message.subject}</b>`, message.message].filter(Boolean).join('<br />'),
    rootUrl
  });
}

async function assertContractMessagesAsync(context, spinner) {
  const {
    messages,
    isFatal
  } = await getRequiredContractMessagesAsync(context);

  if (Array.isArray(messages) && messages.length) {
    if (spinner) {
      spinner.stop();
    }

    _log().default.newLine();

    _log().default.log(_chalk().default.yellow.bold('Messages from App Store Connect:'));

    _log().default.newLine();

    for (const message of messages) {
      if (_log().default.isDebug) {
        _log().default.log(JSON.stringify(message, null, 2));

        _log().default.newLine();
      }

      _log().default.addNewLineIfNone();

      _log().default.log(formatContractMessage(message));
    }

    _log().default.addNewLineIfNone(); // Only throw an error if we know that the status is fatal, otherwise attempt to finish the process.


    if (isFatal) {
      throw new (_CommandError().default)('App Store Connect has agreement updates that must be resolved');
    }
  }
}
//# sourceMappingURL=contractMessages.js.map