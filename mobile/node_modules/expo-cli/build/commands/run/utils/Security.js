"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertInstalledAsync = assertInstalledAsync;
exports.extractCodeSigningInfo = extractCodeSigningInfo;
exports.extractSigningId = extractSigningId;
exports.findIdentitiesAsync = findIdentitiesAsync;
exports.getCertificateForSigningIdAsync = getCertificateForSigningIdAsync;
exports.resolveCertificateSigningInfoAsync = resolveCertificateSigningInfoAsync;
exports.resolveIdentitiesAsync = resolveIdentitiesAsync;

function _spawnAsync() {
  const data = _interopRequireDefault(require("@expo/spawn-async"));

  _spawnAsync = function () {
    return data;
  };

  return data;
}

function _nodeForge() {
  const data = _interopRequireDefault(require("node-forge"));

  _nodeForge = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function assertInstalledAsync() {
  try {
    await (0, _spawnAsync().default)('which', ['security']);
  } catch {
    throw new (_CommandError().default)("Cannot code sign project because the CLI `security` is not available on your computer.\nPlease ensure it's installed and try again.");
  }
}

async function getCertificateForSigningIdAsync(id) {
  var _await$spawnAsync$std, _await$spawnAsync$std2;

  const pem = (_await$spawnAsync$std = (await (0, _spawnAsync().default)('security', ['find-certificate', '-c', id, '-p'])).stdout) === null || _await$spawnAsync$std === void 0 ? void 0 : (_await$spawnAsync$std2 = _await$spawnAsync$std.trim) === null || _await$spawnAsync$std2 === void 0 ? void 0 : _await$spawnAsync$std2.call(_await$spawnAsync$std);

  if (!pem) {
    throw new (_CommandError().default)(`Failed to get PEM certificate for ID "${id}" using the \`security\` CLI`);
  }

  return _nodeForge().default.pki.certificateFromPem(pem);
}

async function findIdentitiesAsync() {
  var _await$spawnAsync$std3, _await$spawnAsync$std4;

  const results = (_await$spawnAsync$std3 = (_await$spawnAsync$std4 = (await (0, _spawnAsync().default)('security', ['find-identity', '-p', 'codesigning', '-v'])).stdout).trim) === null || _await$spawnAsync$std3 === void 0 ? void 0 : _await$spawnAsync$std3.call(_await$spawnAsync$std4); // Returns a string like:
  // 1) 12222234253761286351826735HGKDHAJGF45283 "Apple Development: Evan Bacon (AA00AABB0A)" (CSSMERR_TP_CERT_REVOKED)
  // 2) 12312234253761286351826735HGKDHAJGF45283 "Apple Development: bacon@expo.io (BB00AABB0A)"
  // 3) 12442234253761286351826735HGKDHAJGF45283 "iPhone Distribution: Evan Bacon (CC00AABB0B)" (CSSMERR_TP_CERT_REVOKED)
  // 4) 15672234253761286351826735HGKDHAJGF45283 "Apple Development: Evan Bacon (AA00AABB0A)"
  //  4 valid identities found

  const parsed = results.split('\n').map(line => extractCodeSigningInfo(line)).filter(Boolean); // Remove duplicates

  return [...new Set(parsed)];
}
/**
 * @param value '  2) 12312234253761286351826735HGKDHAJGF45283 "Apple Development: bacon@expo.io (BB00AABB0A)"'
 * @returns 'Apple Development: Evan Bacon (PH75MDXG4H)'
 */


function extractCodeSigningInfo(value) {
  var _value$match$, _value$match;

  return (_value$match$ = (_value$match = value.match(/^\s*\d+\).+"(.+Develop(ment|er).+)"$/)) === null || _value$match === void 0 ? void 0 : _value$match[1]) !== null && _value$match$ !== void 0 ? _value$match$ : null;
}

async function resolveIdentitiesAsync(identities) {
  const values = identities.map(extractSigningId).filter(Boolean);
  return await Promise.all(values.map(signingCertificateId => resolveCertificateSigningInfoAsync(signingCertificateId)));
}

async function resolveCertificateSigningInfoAsync(signingCertificateId) {
  var _certificate$subject$, _certificate$subject$2, _certificate$subject$3;

  const certificate = await getCertificateForSigningIdAsync(signingCertificateId);
  return {
    signingCertificateId,
    codeSigningInfo: (_certificate$subject$ = certificate.subject.getField('CN')) === null || _certificate$subject$ === void 0 ? void 0 : _certificate$subject$.value,
    appleTeamName: (_certificate$subject$2 = certificate.subject.getField('O')) === null || _certificate$subject$2 === void 0 ? void 0 : _certificate$subject$2.value,
    appleTeamId: (_certificate$subject$3 = certificate.subject.getField('OU')) === null || _certificate$subject$3 === void 0 ? void 0 : _certificate$subject$3.value
  };
}
/**
 * @param codeSigningInfo 'Apple Development: Evan Bacon (AA00AABB0A)'
 * @returns 'AA00AABB0A'
 */


function extractSigningId(codeSigningInfo) {
  var _codeSigningInfo$matc, _codeSigningInfo$matc2;

  return (_codeSigningInfo$matc = (_codeSigningInfo$matc2 = codeSigningInfo.match(/.*\(([a-zA-Z0-9]+)\)/)) === null || _codeSigningInfo$matc2 === void 0 ? void 0 : _codeSigningInfo$matc2[1]) !== null && _codeSigningInfo$matc !== void 0 ? _codeSigningInfo$matc : null;
}
//# sourceMappingURL=Security.js.map