"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveTemplateArgAsync = resolveTemplateArgAsync;

function _chalk() {
  const data = _interopRequireDefault(require("chalk"));

  _chalk = function () {
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

function _nodeFetch() {
  const data = _interopRequireDefault(require("node-fetch"));

  _nodeFetch = function () {
    return data;
  };

  return data;
}

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _CommandError() {
  const data = _interopRequireWildcard(require("../../CommandError"));

  _CommandError = function () {
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

function _npm() {
  const data = require("../utils/npm");

  _npm = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function isUrlOk(url) {
  try {
    const res = await (0, _nodeFetch().default)(url);
    return res.status === 200;
  } catch {
    return false;
  }
}

async function getRepoInfo(url, examplePath) {
  const [, username, name, t, _branch, ...file] = url.pathname.split('/');
  const filePath = examplePath ? examplePath.replace(/^\//, '') : file.join('/'); // Support repos whose entire purpose is to be an example, e.g.
  // https://github.com/:username/:my-cool-example-repo-name.

  if (t === undefined) {
    const infoResponse = await (0, _nodeFetch().default)(`https://api.github.com/repos/${username}/${name}`);

    if (infoResponse.status !== 200) {
      return;
    }

    const info = await infoResponse.json();
    return {
      username,
      name,
      branch: info['default_branch'],
      filePath
    };
  } // If examplePath is available, the branch name takes the entire path


  const branch = examplePath ? `${_branch}/${file.join('/')}`.replace(new RegExp(`/${filePath}|/$`), '') : _branch;

  if (username && name && branch && t === 'tree') {
    return {
      username,
      name,
      branch,
      filePath
    };
  }

  return undefined;
}

function hasRepo({
  username,
  name,
  branch,
  filePath
}) {
  const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`;
  const packagePath = `${filePath ? `/${filePath}` : ''}/package.json`;
  return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`);
}

async function resolveTemplateArgAsync(tempDir, oraInstance, appName, template, templatePath) {
  let repoInfo;

  if (template) {
    // @ts-ignore
    let repoUrl;

    try {
      // @ts-ignore
      repoUrl = new URL(template);
    } catch (error) {
      if (error.code !== 'ERR_INVALID_URL') {
        oraInstance.fail(error);
        throw error;
      }
    }

    if (!repoUrl) {
      const templatePath = _path().default.resolve(template);

      if (!fs().existsSync(templatePath)) {
        throw new (_CommandError().default)(`template file does not exist: ${templatePath}`);
      }

      await (0, _npm().extractLocalNpmTarballAsync)(templatePath, {
        cwd: tempDir,
        name: appName
      });
      return tempDir;
    }

    if (repoUrl.origin !== 'https://github.com') {
      oraInstance.fail(`Invalid URL: ${_chalk().default.red(`"${template}"`)}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`);
      throw new (_CommandError().AbortCommandError)();
    }

    repoInfo = await getRepoInfo(repoUrl, templatePath);

    if (!repoInfo) {
      oraInstance.fail(`Found invalid GitHub URL: ${_chalk().default.red(`"${template}"`)}. Please fix the URL and try again.`);
      throw new (_CommandError().AbortCommandError)();
    }

    const found = await hasRepo(repoInfo);

    if (!found) {
      oraInstance.fail(`Could not locate the repository for ${_chalk().default.red(`"${template}"`)}. Please check that the repository exists and try again.`);
      throw new (_CommandError().AbortCommandError)();
    }
  }

  if (repoInfo) {
    oraInstance.text = _chalk().default.bold(`Downloading files from repo ${_chalk().default.cyan(template)}. This might take a moment.`);
    await downloadAndExtractRepoAsync(tempDir, repoInfo);
  }

  return true;
}

function downloadAndExtractRepoAsync(root, {
  username,
  name,
  branch,
  filePath
}) {
  const projectName = _path().default.basename(root);

  const strip = filePath ? filePath.split('/').length + 1 : 1;
  const url = `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`;

  _log().default.debug('Downloading tarball from:', url);

  return (0, _npm().extractNpmTarballFromUrlAsync)(url, {
    cwd: root,
    name: projectName,
    strip,
    fileList: [`${name}-${branch}${filePath ? `/${filePath}` : ''}`]
  });
}
//# sourceMappingURL=Github.js.map