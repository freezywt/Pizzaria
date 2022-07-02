"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DistCertManager = exports.AppleTooManyCertsError = void 0;
exports.createDistributionCertificateAsync = createDistributionCertificateAsync;
exports.getCertificateBySerialNumberAsync = getCertificateBySerialNumberAsync;
exports.getDistributionCertificateAync = getDistributionCertificateAync;
exports.isDistCert = isDistCert;
exports.listDistributionCertificatesAsync = listDistributionCertificatesAsync;
exports.revokeDistributionCertificateAsync = revokeDistributionCertificateAsync;
exports.transformCertificate = transformCertificate;

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

function _dateformat() {
  const data = _interopRequireDefault(require("dateformat"));

  _dateformat = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireWildcard(require("../CommandError"));

  _CommandError = function () {
    return data;
  };

  return data;
}

function _ora() {
  const data = require("../utils/ora");

  _ora = function () {
    return data;
  };

  return data;
}

function _authenticate() {
  const data = require("./authenticate");

  _authenticate = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppleTooManyCertsError extends _CommandError().default {}

exports.AppleTooManyCertsError = AppleTooManyCertsError;

async function getCertificateBySerialNumberAsync(context, serialNumber) {
  const cert = (await _appleUtils().Certificate.getAsync(context)).find(item => item.attributes.serialNumber === serialNumber);

  if (!cert) {
    throw new (_CommandError().default)(`No certificate exists with serial number "${serialNumber}"`);
  }

  return cert;
}

async function getDistributionCertificateAync(context, serialNumber) {
  var _certificates$find;

  // At most, this returns 2 values.
  const certificates = await _appleUtils().Certificate.getAsync(context, {
    query: {
      filter: {
        certificateType: _appleUtils().CertificateType.IOS_DISTRIBUTION
      }
    }
  });
  return (_certificates$find = certificates.find(certificate => certificate.attributes.serialNumber === serialNumber)) !== null && _certificates$find !== void 0 ? _certificates$find : null;
}

function transformCertificate(cert) {
  return {
    id: cert.id,
    name: cert.attributes.name,
    status: cert.attributes.status,
    created: new Date(cert.attributes.requestedDate).getTime() / 1000,
    expires: new Date(cert.attributes.expirationDate).getTime() / 1000,
    ownerName: cert.attributes.ownerName,
    ownerId: cert.attributes.ownerId,
    serialNumber: cert.attributes.serialNumber
  };
}

async function listDistributionCertificatesAsync(authCtx) {
  const spinner = (0, _ora().ora)(`Fetching Apple distribution certificates`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const certs = (await _appleUtils().Certificate.getAsync(context, {
      query: {
        filter: {
          certificateType: [_appleUtils().CertificateType.DISTRIBUTION, _appleUtils().CertificateType.IOS_DISTRIBUTION, _appleUtils().CertificateType.MAC_APP_DISTRIBUTION]
        }
      }
    })).map(transformCertificate);
    spinner.succeed(`Fetched Apple distribution certificates`);
    return certs;
  } catch (error) {
    spinner.fail(`Failed to fetch Apple distribution certificates`);
    throw error;
  }
}
/**
 * Run from `eas credentials` -> iOS -> Add new Distribution Certificate
 */


async function createDistributionCertificateAsync(authCtx) {
  const spinner = (0, _ora().ora)(`Creating Apple distribution certificate`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    const results = await (0, _appleUtils().createCertificateAndP12Async)(context, {
      certificateType: _appleUtils().CertificateType.IOS_DISTRIBUTION
    });
    spinner.succeed(`Created Apple distribution certificate`);
    return {
      certId: results.certificate.id,
      certP12: results.certificateP12,
      certPassword: results.password,
      certPrivateSigningKey: results.privateSigningKey,
      distCertSerialNumber: results.certificate.attributes.serialNumber,
      teamId: authCtx.team.id,
      teamName: authCtx.team.name
    };
  } catch (error) {
    spinner.fail('Failed to create Apple distribution certificate'); // TODO: Move check into apple-utils

    if (/You already have a current .* certificate or a pending certificate request/.test(error.message)) {
      throw new AppleTooManyCertsError(_CommandError().ErrorCodes.APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR, APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR);
    }

    throw error;
  }
}

async function revokeDistributionCertificateAsync(authCtx, ids) {
  const name = `Apple distribution certificate${(ids === null || ids === void 0 ? void 0 : ids.length) === 1 ? '' : 's'}`;
  const spinner = (0, _ora().ora)(`Revoking ${name}`).start();

  try {
    const context = (0, _authenticate().getRequestContext)(authCtx);
    await Promise.all(ids.map(id => _appleUtils().Certificate.deleteAsync(context, {
      id
    })));
    spinner.succeed(`Revoked ${name}`);
  } catch (error) {
    spinner.fail(`Failed to revoke ${name}`);
    throw error;
  }
}

function isDistCert(obj) {
  return obj.certP12 && typeof obj.certP12 === 'string' && obj.certPassword && typeof obj.certPassword === 'string' && obj.teamId && typeof obj.teamId === 'string';
}

const APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR = `
You can have only ${_chalk().default.underline('three')} Apple Distribution Certificates generated on your Apple Developer account.
Please revoke the old ones or reuse existing from your other apps.
Please remember that Apple Distribution Certificates are not application specific!
`;

class DistCertManager {
  constructor(ctx) {
    this.ctx = ctx;
  }

  async list() {
    return listDistributionCertificatesAsync(this.ctx);
  }

  async create() {
    return createDistributionCertificateAsync(this.ctx);
  }

  async revoke(ids) {
    return revokeDistributionCertificateAsync(this.ctx, ids);
  }

  format({
    name,
    id,
    status,
    expires,
    created,
    ownerName
  }) {
    const expiresDate = _formatTimestamp(expires);

    const createdDate = _formatTimestamp(created);

    return `${name} (${status}) - ID: ${id} - expires: ${expiresDate} (created: ${createdDate}) - owner: ${ownerName}`;
  }

}

exports.DistCertManager = DistCertManager;

function _formatTimestamp(timestamp) {
  return (0, _dateformat().default)(new Date(timestamp * 1000));
}
//# sourceMappingURL=distributionCert.js.map