"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printTableJson = printTableJson;
exports.printTableJsonArray = printTableJsonArray;

function _cliTable() {
  const data = _interopRequireDefault(require("cli-table3"));

  _cliTable = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printTableJsonArray(headers, jsonArray, colWidths) {
  const table = new (_cliTable().default)({
    head: headers,
    colWidths
  });
  jsonArray.forEach(json => {
    table.push(headers.map(header => json[header] ? json[header] : ''));
  });
  return table.toString();
}

const VERTICAL_CELL_WIDTH = 80;

function printTableJson(json, header1, header2) {
  const table = new (_cliTable().default)();

  if (header1 || header2) {
    header1 = header1 ? header1 : '';
    header2 = header2 ? header2 : '';
    table.push({
      [header1]: header2
    });
  }

  Object.entries(json).forEach(([key, value]) => {
    // check if value is a JSON
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    } else {
      value = String(value);
    } // Add newline every 80 chars


    key = key.replace(new RegExp('(.{' + VERTICAL_CELL_WIDTH + '})', 'g'), '$1\n');
    value = value.replace(new RegExp('(.{' + VERTICAL_CELL_WIDTH + '})', 'g'), '$1\n');
    table.push({
      [key]: value
    });
  });
  return table.toString();
}
//# sourceMappingURL=cli-table.js.map