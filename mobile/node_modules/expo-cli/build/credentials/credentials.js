"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushKeySchema = exports.provisioningProfileSchema = exports.keystoreSchema = exports.distCertSchema = exports.appleTeamSchema = exports.EXPO_WILL_GENERATE = void 0;
//
// iOS
//
const distCertSchema = {
  id: 'distributionCert',
  canReuse: true,
  name: 'Apple Distribution Certificate',
  required: ['certP12', 'certPassword', 'teamId'],
  questions: {
    certP12: {
      question: 'Path to P12 file:',
      type: 'file',
      base64Encode: true
    },
    certPassword: {
      type: 'password',
      question: 'P12 password:'
    },
    teamId: {
      type: 'string',
      question: 'Apple Team ID:'
    }
  }
};
exports.distCertSchema = distCertSchema;
const pushKeySchema = {
  id: 'pushKey',
  canReuse: true,
  name: 'Apple Push Notifications service key',
  required: ['apnsKeyP8', 'apnsKeyId', 'teamId'],
  questions: {
    apnsKeyP8: {
      type: 'file',
      question: 'Path to P8 file:'
    },
    apnsKeyId: {
      type: 'string',
      question: 'Key ID:'
    },
    teamId: {
      type: 'string',
      question: 'Apple Team ID:'
    }
  }
};
exports.pushKeySchema = pushKeySchema;
const provisioningProfileSchema = {
  id: 'provisioningProfile',
  name: 'Apple Provisioning Profile',
  required: ['provisioningProfile'],
  dependsOn: 'distributionCert',
  questions: {
    provisioningProfile: {
      type: 'file',
      question: 'Path to .mobile provisioning profile:',
      base64Encode: true
    }
  }
};
exports.provisioningProfileSchema = provisioningProfileSchema;
const appleTeamSchema = {
  id: 'team',
  name: 'Apple Team',
  required: ['id'],
  questions: {
    id: {
      type: 'string',
      question: 'Apple Team ID:'
    }
  }
}; //
// Android
//

exports.appleTeamSchema = appleTeamSchema;
const keystoreSchema = {
  id: 'keystore',
  name: 'Android Keystore',
  provideMethodQuestion: {
    question: `Would you like to upload a Keystore or have us generate one for you?\nIf you don't know what this means, let us generate it! :)`,
    expoGenerated: 'Generate new keystore',
    userProvided: 'I want to upload my own file'
  },
  required: ['keystore', 'keystorePassword', 'keyAlias', 'keyPassword'],
  questions: {
    keystore: {
      question: 'Path to the Keystore file.',
      type: 'file',
      base64Encode: true
    },
    keystorePassword: {
      question: 'Keystore password',
      type: 'password'
    },
    keyAlias: {
      question: 'Key alias',
      type: 'string'
    },
    keyPassword: {
      question: 'Key password',
      type: 'password'
    }
  }
};
exports.keystoreSchema = keystoreSchema;
const EXPO_WILL_GENERATE = 'EXPO_PLEASE_GENERATE_THIS_FOR_ME';
exports.EXPO_WILL_GENERATE = EXPO_WILL_GENERATE;
//# sourceMappingURL=credentials.js.map