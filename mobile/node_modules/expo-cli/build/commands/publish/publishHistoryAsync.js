"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionAsync = actionAsync;

function _dateformat() {
  const data = _interopRequireDefault(require("dateformat"));

  _dateformat = function () {
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

function _PublishUtils() {
  const data = require("../utils/PublishUtils");

  _PublishUtils = function () {
    return data;
  };

  return data;
}

function table() {
  const data = _interopRequireWildcard(require("../utils/cli-table"));

  table = function () {
    return data;
  };

  return data;
}

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HORIZ_CELL_WIDTH_SMALL = 15;
const HORIZ_CELL_WIDTH_MEDIUM = 20;
const HORIZ_CELL_WIDTH_BIG = 40;

async function actionAsync(projectRoot, options) {
  const result = await (0, _PublishUtils().getPublishHistoryAsync)(projectRoot, options);

  if (options.raw) {
    _log().default.log(JSON.stringify(result));

    return;
  }

  if (result.queryResult && result.queryResult.length > 0) {
    // Print general publication info
    const sampleItem = result.queryResult[0]; // get a sample item

    const generalTableString = table().printTableJson({
      fullName: sampleItem.fullName
    }, 'General Info');

    _log().default.log(generalTableString);

    const hasRuntimeVersion = result.queryResult.some(publication => !!publication.runtimeVersion);
    const hasSdkVersion = result.queryResult.some(publication => !!publication.sdkVersion); // Print info specific to each publication

    const headers = ['publishedTime', 'appVersion', ...(hasSdkVersion ? ['sdkVersion'] : []), ...(hasRuntimeVersion ? ['runtimeVersion'] : []), 'platform', 'channel', 'publicationId']; // colWidths contains the cell size of each header

    const colWidths = [];
    const bigCells = new Set(['publicationId', 'publishedTime', 'channel']);
    const mediumCells = new Set(['runtimeVersion']);
    headers.forEach(header => {
      if (bigCells.has(header)) {
        colWidths.push(HORIZ_CELL_WIDTH_BIG);
      } else if (mediumCells.has(header)) {
        colWidths.push(HORIZ_CELL_WIDTH_MEDIUM);
      } else {
        colWidths.push(HORIZ_CELL_WIDTH_SMALL);
      }
    });
    const resultRows = result.queryResult.map(publication => ({ ...publication,
      publishedTime: (0, _dateformat().default)(publication.publishedTime, 'ddd mmm dd yyyy HH:MM:ss Z')
    }));
    const tableString = table().printTableJsonArray(headers, resultRows, colWidths);

    _log().default.log(tableString);
  } else {
    throw new Error('No records found matching your query.');
  }
}
//# sourceMappingURL=publishHistoryAsync.js.map