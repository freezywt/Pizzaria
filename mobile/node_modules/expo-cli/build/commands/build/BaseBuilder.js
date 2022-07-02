"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _config() {
  const data = require("@expo/config");

  _config = function () {
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

function _ora() {
  const data = _interopRequireDefault(require("ora"));

  _ora = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
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

function _log() {
  const data = _interopRequireDefault(require("../../log"));

  _log = function () {
    return data;
  };

  return data;
}

function _publishAsync() {
  const data = require("../publish/publishAsync");

  _publishAsync = function () {
    return data;
  };

  return data;
}

function _promise() {
  const data = require("../utils/promise");

  _promise = function () {
    return data;
  };

  return data;
}

function UrlUtils() {
  const data = _interopRequireWildcard(require("../utils/url"));

  UrlUtils = function () {
    return data;
  };

  return data;
}

function _BuildError() {
  const data = _interopRequireDefault(require("./BuildError"));

  _BuildError = function () {
    return data;
  };

  return data;
}

function _constants() {
  const data = require("./constants");

  _constants = function () {
    return data;
  };

  return data;
}

function _findReusableBuildAsync() {
  const data = require("./findReusableBuildAsync");

  _findReusableBuildAsync = function () {
    return data;
  };

  return data;
}

function _getBuildStatusAsync() {
  const data = require("./getBuildStatusAsync");

  _getBuildStatusAsync = function () {
    return data;
  };

  return data;
}

function _getLatestReleaseAsync() {
  const data = require("./getLatestReleaseAsync");

  _getLatestReleaseAsync = function () {
    return data;
  };

  return data;
}

function _startBuildAsync() {
  const data = require("./startBuildAsync");

  _startBuildAsync = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const secondsToMilliseconds = seconds => seconds * 1000;

class BaseBuilder {
  async getUserAsync() {
    return await _xdl().UserManager.ensureLoggedInAsync();
  }

  constructor(projectDir, options = {}) {
    this.projectDir = projectDir;
    this.options = options;

    _defineProperty(this, "projectConfig", void 0);

    _defineProperty(this, "manifest", void 0);

    this.projectConfig = (0, _config().getConfig)(this.projectDir);
    this.manifest = this.projectConfig.exp;
  }

  updateProjectConfig() {
    // Update the project config
    this.projectConfig = (0, _config().getConfig)(this.projectDir);
    this.manifest = this.projectConfig.exp;
  }

  async command() {
    try {
      await this.prepareProjectInfo();
      await this.run();
    } catch (e) {
      if (!(e instanceof _BuildError().default)) {
        throw e;
      } else {
        _log().default.error(e.message);

        process.exit(1);
      }
    }
  }

  async run() {
    throw new Error('`run()` should be overridden');
  }

  async commandCheckStatus() {
    try {
      await this.prepareProjectInfo();
      await this.checkStatus();
    } catch (e) {
      if (!(e instanceof _BuildError().default)) {
        throw e;
      } else {
        _log().default.error(e.message);

        process.exit(1);
      }
    }
  }

  async prepareProjectInfo() {
    await this.checkProjectConfig(); // note: this validates if a robot user is used without "owner" in the manifest
    // without this check, build/status returns "robots not allowed".

    _xdl().UserManager.getProjectOwner( // TODO: Move this since it can add delay
    await this.getUserAsync(), this.projectConfig.exp);
  }

  async checkProjectConfig() {
    if (this.manifest.isDetached) {
      _log().default.error(`'expo build:${this.platform()}' is not supported for detached projects.`);

      process.exit(1);
    } // Warn user if building a project using the next deprecated SDK version


    const oldestSupportedMajorVersion = await _xdl().Versions.oldestSupportedMajorVersionAsync();

    if (_semver().default.major(this.manifest.sdkVersion) === oldestSupportedMajorVersion) {
      const {
        version
      } = await _xdl().Versions.newestReleasedSdkVersionAsync();

      _log().default.warn(`\nSDK${oldestSupportedMajorVersion} will be ${_chalk().default.bold('deprecated')} next! We recommend upgrading versions, ideally to the latest (SDK${_semver().default.major(version)}), so you can continue to build new binaries of your app and develop in Expo Go.\n`);
    }
  }

  async checkForBuildInProgress() {
    _log().default.log('Checking if there is a build in progress...\n');

    const buildStatus = await (0, _getBuildStatusAsync().getBuildStatusAsync)(this.projectDir, {
      platform: this.platform(),
      current: true,
      releaseChannel: this.options.releaseChannel,
      publicUrl: this.options.publicUrl,
      sdkVersion: this.manifest.sdkVersion
    });

    if (buildStatus.jobs && buildStatus.jobs.length > 0) {
      throw new (_BuildError().default)('Cannot start a new build, as there is already an in-progress build.');
    }
  }

  async checkStatus(platform = 'all') {
    _log().default.log('Fetching build history...\n');

    const buildStatus = await (0, _getBuildStatusAsync().getBuildStatusAsync)(this.projectDir, {
      platform,
      current: false,
      releaseChannel: this.options.releaseChannel
    });

    if ('err' in buildStatus && buildStatus.err) {
      throw new Error('Error getting current build status for this project.');
    }

    if (!(buildStatus.jobs && buildStatus.jobs.length)) {
      _log().default.log('No currently active or previous builds for this project.');

      return;
    }

    await this.logBuildStatuses({
      jobs: buildStatus.jobs,
      canPurchasePriorityBuilds: buildStatus.canPurchasePriorityBuilds,
      numberOfRemainingPriorityBuilds: buildStatus.numberOfRemainingPriorityBuilds,
      hasUnlimitedPriorityBuilds: buildStatus.hasUnlimitedPriorityBuilds
    });
  }

  async checkStatusBeforeBuild() {
    _log().default.log('Checking if this build already exists...\n');

    const reuseStatus = await (0, _findReusableBuildAsync().findReusableBuildAsync)(this.options.releaseChannel, this.platform(), this.manifest.sdkVersion, this.manifest.slug, this.manifest.owner);

    if (reuseStatus.canReuse) {
      _log().default.warn(`Did you know that Expo provides over-the-air updates?
Please see the docs (${_chalk().default.underline('https://docs.expo.dev/guides/configuring-ota-updates/')}) and check if you can use them instead of building your app binaries again.`);

      _log().default.warn(`There were no new changes from the last build, you can download that build from here: ${_chalk().default.underline(reuseStatus.downloadUrl)}`);

      _log().default.newLine();
    }
  }

  async logBuildStatuses(buildStatus) {
    _log().default.log('=================');

    _log().default.log(' Builds Statuses ');

    _log().default.log('=================\n');

    const username = this.manifest.owner ? this.manifest.owner : await _xdl().UserManager.getCurrentUsernameAsync();
    buildStatus.jobs.forEach((job, i) => {
      var _buildStatus$numberOf;

      let platform, packageExtension;

      if (job.platform === 'ios') {
        platform = 'iOS';
        packageExtension = 'IPA';
      } else {
        platform = 'Android';
        packageExtension = 'APK';
      }

      _log().default.log(`### ${i} | ${platform} | ${UrlUtils().constructBuildLogsUrl({
        buildId: job.id,
        projectSlug: this.manifest.slug,
        username: username !== null && username !== void 0 ? username : undefined
      })} ###`);

      const hasPriorityBuilds = ((_buildStatus$numberOf = buildStatus.numberOfRemainingPriorityBuilds) !== null && _buildStatus$numberOf !== void 0 ? _buildStatus$numberOf : 0) > 0 || buildStatus.hasUnlimitedPriorityBuilds;
      const shouldShowUpgradeInfo = !hasPriorityBuilds && i === 0 && job.priority === 'normal' && buildStatus.canPurchasePriorityBuilds;
      let status;

      switch (job.status) {
        case 'pending':
        case 'sent-to-queue':
          status = `Build waiting in queue...\nQueue length: ${_chalk().default.underline(UrlUtils().constructTurtleStatusUrl())}`;

          if (shouldShowUpgradeInfo) {
            status += `\nWant to wait less? Get priority builds at ${_chalk().default.underline('https://expo.dev/settings/billing')}.`;
          }

          break;

        case 'started':
          status = 'Build started...';
          break;

        case 'in-progress':
          status = 'Build in progress...';

          if (shouldShowUpgradeInfo) {
            status += `\nWant to wait less? Get priority builds at ${_chalk().default.underline('https://expo.dev/settings/billing')}.`;
          }

          break;

        case 'finished':
          status = 'Build finished.';

          if (shouldShowUpgradeInfo) {
            status += `\nLooks like this build could have been faster.\nRead more about priority builds at ${_chalk().default.underline('https://expo.dev/settings/billing')}.`;
          }

          break;

        case 'errored':
          status = 'There was an error with this build.';

          if (job.id) {
            status += `

When requesting support, please provide this build ID:

${job.id}
`;
          }

          break;

        default:
          status = '';
          break;
      }

      _log().default.log(status);

      if (job.status === 'finished') {
        if (job.artifacts) {
          _log().default.log(`${packageExtension}: ${job.artifacts.url}`);
        } else {
          _log().default.log(`Problem getting ${packageExtension} URL. Please try to build again.`);
        }
      }

      _log().default.log();
    });
  }

  async ensureReleaseExists() {
    if (this.options.publish) {
      const {
        ids,
        url,
        err
      } = await (0, _publishAsync().actionAsync)(this.projectDir, { ...this.options,
        duringBuild: true
      });

      if (err) {
        throw new (_BuildError().default)(`No url was returned from publish. Please try again.\n${err}`);
      } else if (!url || url === '') {
        throw new (_BuildError().default)('No url was returned from publish. Please try again.');
      }

      return ids;
    } else {
      _log().default.log('Looking for releases...');

      const release = await (0, _getLatestReleaseAsync().getLatestReleaseAsync)(this.projectDir, {
        releaseChannel: this.options.releaseChannel,
        platform: this.platform(),
        owner: this.manifest.owner
      });

      if (!release) {
        throw new (_BuildError().default)('No releases found. Please create one using `expo publish` first.');
      }

      _log().default.log(`Using existing release on channel "${release.channel}":\n` + `publicationId: ${release.publicationId}\n  publishedTime: ${release.publishedTime}`);

      return [release.publicationId];
    }
  }

  async wait(buildId, {
    interval = 30,
    publicUrl
  } = {}) {
    _log().default.log(`Waiting for build to complete.\nYou can press Ctrl+C to exit. It won't cancel the build, you'll be able to monitor it at the printed URL.`);

    const spinner = (0, _ora().default)().start();
    let i = 0;

    while (true) {
      var _result$jobs;

      i++;
      const result = await (0, _getBuildStatusAsync().getBuildStatusAsync)(this.projectDir, {
        current: false,
        ...(publicUrl ? {
          publicUrl
        } : {})
      });
      const jobs = (_result$jobs = result.jobs) === null || _result$jobs === void 0 ? void 0 : _result$jobs.filter(job => job.id === buildId);
      const job = jobs ? jobs[0] : null;

      if (job) {
        switch (job.status) {
          case 'finished':
            spinner.succeed('Build finished.');
            return job;

          case 'pending':
          case 'sent-to-queue':
            spinner.text = 'Build queued...';
            break;

          case 'started':
          case 'in-progress':
            spinner.text = 'Build in progress...';
            break;

          case 'errored':
            spinner.fail('Build failed.');
            throw new (_BuildError().default)(`Standalone build failed!`);

          default:
            spinner.warn('Unknown status.');
            throw new (_BuildError().default)(`Unknown status: ${job.status} - aborting!`);
        }
      } else if (i > 5) {
        spinner.warn('Unknown status.');
        throw new (_BuildError().default)(`Failed to locate build job for id "${buildId}"`);
      }

      await (0, _promise().sleep)(secondsToMilliseconds(interval));
    }
  }

  async build(expIds) {
    var _this$manifest$ios;

    const {
      publicUrl
    } = this.options;
    const platform = this.platform();
    const bundleIdentifier = (_this$manifest$ios = this.manifest.ios) === null || _this$manifest$ios === void 0 ? void 0 : _this$manifest$ios.bundleIdentifier;
    let opts = {
      expIds,
      platform,
      releaseChannel: this.options.releaseChannel,
      ...(publicUrl ? {
        publicUrl
      } : {})
    };

    if (platform === _constants().PLATFORMS.IOS) {
      opts = { ...opts,
        type: this.options.type,
        bundleIdentifier
      };
    } else if (platform === _constants().PLATFORMS.ANDROID) {
      opts = { ...opts,
        type: this.options.type
      };
    } // call out to build api here with url


    const result = await (0, _startBuildAsync().startBuildAsync)(this.projectDir, opts);
    const {
      id: buildId,
      priority,
      canPurchasePriorityBuilds
    } = result;

    _log().default.log('Build started, it may take a few minutes to complete.');

    _log().default.log(`You can check the queue length at ${_chalk().default.underline(UrlUtils().constructTurtleStatusUrl())}\n`);

    if (priority === 'normal' && canPurchasePriorityBuilds) {
      _log().default.log('You can make this faster. 🐢\nGet priority builds at: https://expo.dev/settings/billing\n');
    }

    const user = await _xdl().UserManager.getCurrentUserAsync();

    if (buildId) {
      const url = UrlUtils().constructBuildLogsUrl({
        buildId,
        projectSlug: this.manifest.slug,
        username: this.manifest.owner || ((user === null || user === void 0 ? void 0 : user.kind) === 'user' ? user.username : undefined)
      });

      _log().default.log(`You can monitor the build at\n\n ${_chalk().default.underline(url)}\n`);
    }

    if (this.options.wait) {
      const waitOpts = publicUrl ? {
        publicUrl
      } : {};
      const completedJob = await this.wait(buildId, waitOpts);
      const artifactUrl = completedJob.artifactId ? UrlUtils().constructArtifactUrl(completedJob.artifactId) : completedJob.artifacts.url;

      _log().default.addNewLineIfNone();

      _log().default.log(`${_chalk().default.green('Successfully built standalone app:')} ${_chalk().default.underline(artifactUrl)}`);
    } else {
      _log().default.log('Alternatively, run `expo build:status` to monitor it from the command line.');
    }
  }

  platform() {
    return _constants().PLATFORMS.ALL;
  }

}

exports.default = BaseBuilder;
//# sourceMappingURL=BaseBuilder.js.map