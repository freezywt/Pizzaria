"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensurePNGIsNotTransparent = ensurePNGIsNotTransparent;

function _axios() {
  const data = _interopRequireDefault(require("axios"));

  _axios = function () {
    return data;
  };

  return data;
}

function _fsExtra() {
  const data = _interopRequireDefault(require("fs-extra"));

  _fsExtra = function () {
    return data;
  };

  return data;
}

function _pngjs() {
  const data = require("pngjs");

  _pngjs = function () {
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getImageStreamAsync(imagePathOrURL) {
  const isUrl = _xdl().UrlUtils.isURL(imagePathOrURL, {
    protocols: ['http', 'https'],
    requireProtocol: true
  });

  if (isUrl) {
    const response = await _axios().default.get(imagePathOrURL, {
      responseType: 'stream'
    });
    return response.data;
  } else {
    return _fsExtra().default.createReadStream(imagePathOrURL);
  }
}

async function ensurePNGIsNotTransparent(imagePathOrURL) {
  let hasAlreadyResolved = false;
  const stream = await getImageStreamAsync(imagePathOrURL);
  return new Promise((res, rej) => {
    stream.pipe(new (_pngjs().PNG)({
      filterType: 4
    })).on('metadata', ({
      alpha
    }) => {
      if (!alpha) {
        hasAlreadyResolved = true;
        if ('close' in stream) stream.close();
        res();
      }
    }).on('parsed', () => {
      if (hasAlreadyResolved) {
        return;
      }

      try {
        // @ts-ignore: 'this' implicitly has type 'any' because it does not have a type annotation.
        validateAlphaChannelIsEmpty(this.data, {
          width: this.width,
          height: this.height
        });
        res();
      } catch (err) {
        rej(err);
      }
    }).on('error', err => rej(err));
  });
}

function validateAlphaChannelIsEmpty(data, {
  width,
  height
}) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;

      if (data[idx + 3] !== 255) {
        throw new (_xdl().XDLError)('INVALID_ASSETS', `Your app icon can't have transparency if you wish to upload your app Apple's App Store. Read more here: https://expo.fyi/remove-alpha-channel`);
      }
    }
  }
}
//# sourceMappingURL=image.js.map