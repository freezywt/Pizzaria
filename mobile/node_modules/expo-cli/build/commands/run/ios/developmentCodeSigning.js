"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureDeviceIsCodeSignedForDeploymentAsync = ensureDeviceIsCodeSignedForDeploymentAsync;
exports.getCodeSigningInfoForPbxproj = getCodeSigningInfoForPbxproj;

function _configPlugins() {
  const data = require("@expo/config-plugins");

  _configPlugins = function () {
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

function _commander() {
  const data = _interopRequireDefault(require("commander"));

  _commander = function () {
    return data;
  };

  return data;
}

function fs() {
  const data = _interopRequireWildcard(require("fs-extra"));

  fs = function () {
    return data;
  };

  return data;
}

function _xdl() {
  const data = require("xdl");

  _xdl = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireDefault(require("../../../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _log() {
  const data = _interopRequireDefault(require("../../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _prompts() {
  const data = require("../../../utils/prompts");

  _prompts = function () {
    return data;
  };

  return data;
}

function _TerminalLink() {
  const data = require("../../utils/TerminalLink");

  _TerminalLink = function () {
    return data;
  };

  return data;
}

function Security() {
  const data = _interopRequireWildcard(require("../utils/Security"));

  Security = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getLastDeveloperCodeSigningIdAsync() {
  const {
    developmentCodeSigningId
  } = await _xdl().UserSettings.readAsync();
  return developmentCodeSigningId;
}

async function setLastDeveloperCodeSigningIdAsync(id) {
  await _xdl().UserSettings.setAsync('developmentCodeSigningId', id).catch(() => {});
}
/**
 * Find the development team and provisioning profile that's currently in use by the Xcode project.
 *
 * @param projectRoot
 * @returns
 */


function getCodeSigningInfoForPbxproj(projectRoot) {
  const project = _configPlugins().IOSConfig.XcodeUtils.getPbxproj(projectRoot);

  const targets = _configPlugins().IOSConfig.Target.findSignableTargets(project);

  const signingInfo = {};

  for (const [nativeTargetId, nativeTarget] of targets) {
    const developmentTeams = [];
    const provisioningProfiles = [];

    _configPlugins().IOSConfig.XcodeUtils.getBuildConfigurationsForListId(project, nativeTarget.buildConfigurationList).filter(([, item]) => item.buildSettings.PRODUCT_NAME).forEach(([, item]) => {
      const {
        DEVELOPMENT_TEAM,
        PROVISIONING_PROFILE
      } = item.buildSettings;

      if (typeof DEVELOPMENT_TEAM === 'string' && // If the user selects "Team: none" in Xcode, it'll be an empty string.
      !!DEVELOPMENT_TEAM && // xcode package sometimes reads an empty string as a quoted empty string.
      DEVELOPMENT_TEAM !== '""') {
        developmentTeams.push(DEVELOPMENT_TEAM);
      }

      if (typeof PROVISIONING_PROFILE === 'string' && !!PROVISIONING_PROFILE) {
        provisioningProfiles.push(PROVISIONING_PROFILE);
      }
    });

    signingInfo[nativeTargetId] = {
      developmentTeams,
      provisioningProfiles
    };
  }

  return signingInfo;
}
/**
 * Set the development team and configure the Xcode project for automatic code signing,
 * this helps us resolve the code signing on subsequent runs and emulates Xcode behavior.
 *
 * @param projectRoot
 * @param props.appleTeamId
 */


function setAutoCodeSigningInfoForPbxproj(projectRoot, {
  appleTeamId
}) {
  const project = _configPlugins().IOSConfig.XcodeUtils.getPbxproj(projectRoot);

  const targets = _configPlugins().IOSConfig.Target.findSignableTargets(project);

  const quotedAppleTeamId = ensureQuotes(appleTeamId);

  for (const [nativeTargetId, nativeTarget] of targets) {
    _configPlugins().IOSConfig.XcodeUtils.getBuildConfigurationsForListId(project, nativeTarget.buildConfigurationList).filter(([, item]) => item.buildSettings.PRODUCT_NAME).forEach(([, item]) => {
      item.buildSettings.DEVELOPMENT_TEAM = quotedAppleTeamId;
      item.buildSettings.CODE_SIGN_IDENTITY = '"Apple Development"';
      item.buildSettings.CODE_SIGN_STYLE = 'Automatic';
    });

    Object.entries(_configPlugins().IOSConfig.XcodeUtils.getProjectSection(project)).filter(_configPlugins().IOSConfig.XcodeUtils.isNotComment).forEach(([, item]) => {
      if (!item.attributes.TargetAttributes[nativeTargetId]) {
        item.attributes.TargetAttributes[nativeTargetId] = {};
      }

      item.attributes.TargetAttributes[nativeTargetId].DevelopmentTeam = quotedAppleTeamId;
      item.attributes.TargetAttributes[nativeTargetId].ProvisioningStyle = 'Automatic';
    });
  }

  fs().writeFileSync(project.filepath, project.writeSync());
}

const ensureQuotes = value => {
  if (!value.match(/^['"]/)) {
    return `"${value}"`;
  }

  return value;
};

async function ensureDeviceIsCodeSignedForDeploymentAsync(projectRoot) {
  // Check if the app already has a development team defined.
  const signingInfo = getCodeSigningInfoForPbxproj(projectRoot);
  const allTargetsHaveTeams = Object.values(signingInfo).reduce((prev, curr) => {
    return prev && !!curr.developmentTeams.length;
  }, true);

  if (allTargetsHaveTeams) {
    const teamList = Object.values(signingInfo).reduce((prev, curr) => {
      return prev.concat([curr.developmentTeams[0]]);
    }, []);

    _log().default.log(_chalk().default.dim`\u203A Auto signing app using team(s): ${teamList.join(', ')}`);

    return null;
  }

  const allTargetsHaveProfiles = Object.values(signingInfo).reduce((prev, curr) => {
    return prev && !!curr.provisioningProfiles.length;
  }, true);

  if (allTargetsHaveProfiles) {
    // this indicates that the user has manual code signing setup (possibly for production).
    return null;
  } // Only assert if the project needs to be signed.


  await Security().assertInstalledAsync();
  const ids = await Security().findIdentitiesAsync();
  const id = await selectCertificateSigningIdentityAsync(ids);

  _log().default.log(`\u203A Signing and building iOS app with: ${id.codeSigningInfo}`);

  setAutoCodeSigningInfoForPbxproj(projectRoot, {
    appleTeamId: id.appleTeamId
  });
  return id.appleTeamId;
}
/**
 * Sort the code signing items so the last selected item (user's default) is the first suggested.
 */


async function sortDefaultIdToBeginningAsync(identities) {
  const lastSelected = await getLastDeveloperCodeSigningIdAsync();

  if (lastSelected) {
    let iterations = 0;

    while (identities[0].signingCertificateId !== lastSelected && iterations < identities.length) {
      identities.push(identities.shift());
      iterations++;
    }
  }

  return [identities, lastSelected];
}

async function selectCertificateSigningIdentityAsync(ids) {
  // The user has no valid code signing identities.
  if (!ids.length) {
    // TODO: We can probably do this too.
    _log().default.addNewLineIfNone();

    _log().default.log(`\u203A Your computer requires some additional setup before you can build onto physical iOS devices.\n  ${_chalk().default.bold((0, _TerminalLink().learnMore)('https://expo.fyi/setup-xcode-signing'))}`);

    _log().default.newLine();

    throw new (_CommandError().default)('No code signing certificates are available to use.');
  } //  One ID available 🤝 Program is not interactive
  //
  //     using the the first available option


  if (ids.length === 1 || _commander().default.nonInteractive) {
    return Security().resolveCertificateSigningInfoAsync(ids[0]);
  } // Get identities and sort by the one that the user is most likely to choose.


  const [identities, preferred] = await sortDefaultIdToBeginningAsync(await Security().resolveIdentitiesAsync(ids));
  const index = await (0, _prompts().selectAsync)({
    message: 'Development team for signing the app',
    choices: identities.map((value, i) => {
      const format = value.signingCertificateId === preferred ? _chalk().default.bold : message => message;
      return {
        // Formatted like: `650 Industries, Inc. (A1BCDEF234) - Apple Development: Evan Bacon (AA00AABB0A)`
        title: format([value.appleTeamName, `(${value.appleTeamId}) -`, value.codeSigningInfo].join(' ')),
        value: i
      };
    })
  });
  const selected = identities[index]; // Store the last used value and suggest it as the first value
  // next time the user has to select a code signing identity.

  await setLastDeveloperCodeSigningIdAsync(selected.signingCertificateId);
  return selected;
}
//# sourceMappingURL=developmentCodeSigning.js.map