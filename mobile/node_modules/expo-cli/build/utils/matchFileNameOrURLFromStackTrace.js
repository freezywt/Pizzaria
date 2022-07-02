"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchFileNameOrURLFromStackTrace = matchFileNameOrURLFromStackTrace;

/**
 * Given a line from a metro stack trace, this can attempt to extract
 * the file name or URL, omitting the code location.
 * Can be used to filter files from the stacktrace like LogBox.
 *
 * @param traceLine
 */
function matchFileNameOrURLFromStackTrace(traceMessage) {
  var _traceMessage$split$;

  if (!traceMessage.includes(' in ')) return null;
  const traceLine = (_traceMessage$split$ = traceMessage.split(' in ')[0]) === null || _traceMessage$split$ === void 0 ? void 0 : _traceMessage$split$.trim(); // Is URL
  // "http://127.0.0.1:19000/index.bundle?platform=ios&dev=true&hot=false&minify=false:110910:3 in global code"

  if (traceLine.match(/https?:\/\//g)) {
    const [url, params] = traceLine.split('?');
    const results = [url];

    if (params) {
      const paramsWithoutLocation = params.replace(/:(\d+)/g, '').trim();
      results.push(paramsWithoutLocation);
    }

    return results.filter(Boolean).join('?');
  } // "node_modules/react-native/Libraries/LogBox/LogBox.js:117:10 in registerWarning"
  // "somn.js:1:0 in <global>"


  return traceLine.replace(/:(\d+)/g, '').trim();
}
//# sourceMappingURL=matchFileNameOrURLFromStackTrace.js.map