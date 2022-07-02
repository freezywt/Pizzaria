"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.printBundleSizes = printBundleSizes;
exports.createFilesTable = createFilesTable;
var _chalk = _interopRequireDefault(require("chalk"));
var _prettyBytes = _interopRequireDefault(require("pretty-bytes"));
var _textTable = _interopRequireDefault(require("text-table"));
var Log = _interopRequireWildcard(require("../log"));
var _ansi = require("../utils/ansi");
var _link = require("../utils/link");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {};
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
function printBundleSizes(bundles) {
    var ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7;
    const files = [];
    if ((ref = bundles.ios) == null ? void 0 : ref.hermesBytecodeBundle) {
        files.push([
            "index.ios.js (Hermes)",
            bundles.ios.hermesBytecodeBundle
        ]);
    } else if ((ref1 = bundles.ios) == null ? void 0 : ref1.code) {
        files.push([
            "index.ios.js",
            bundles.ios.code
        ]);
    }
    if ((ref2 = bundles.android) == null ? void 0 : ref2.hermesBytecodeBundle) {
        files.push([
            "index.android.js (Hermes)",
            bundles.android.hermesBytecodeBundle
        ]);
    } else if ((ref3 = bundles.android) == null ? void 0 : ref3.code) {
        files.push([
            "index.android.js",
            bundles.android.code
        ]);
    }
    // Account for inline source maps
    if ((ref4 = bundles.ios) == null ? void 0 : ref4.hermesSourcemap) {
        files.push([
            _chalk.default.dim("index.ios.js.map (Hermes)"),
            bundles.ios.hermesSourcemap
        ]);
    } else if ((ref5 = bundles.ios) == null ? void 0 : ref5.map) {
        files.push([
            _chalk.default.dim("index.ios.js.map"),
            bundles.ios.map
        ]);
    }
    if ((ref6 = bundles.android) == null ? void 0 : ref6.hermesSourcemap) {
        files.push([
            _chalk.default.dim("index.android.js.map (Hermes)"),
            bundles.android.hermesSourcemap
        ]);
    } else if ((ref7 = bundles.android) == null ? void 0 : ref7.map) {
        files.push([
            _chalk.default.dim("index.android.js.map"),
            bundles.android.map
        ]);
    }
    Log.log();
    Log.log(createFilesTable(files));
    Log.log();
    Log.log(_chalk.default`💡 JavaScript bundle sizes affect startup time. {dim ${(0, _link).learnMore(`https://expo.fyi/javascript-bundle-sizes`)}}`);
    Log.log();
    return files;
}
function createFilesTable(files) {
    const tableData = files.map((item, index)=>{
        const fileBranch = index === 0 ? "\u250C" : index === files.length - 1 ? "\u2514" : "\u251C";
        return [
            `${fileBranch} ${item[0]}`,
            (0, _prettyBytes).default(Buffer.byteLength(item[1], "utf8"))
        ];
    });
    var ref;
    return (0, _textTable).default([
        [
            "Bundle",
            "Size"
        ].map((v)=>_chalk.default.underline(v)
        ),
        ...tableData
    ], {
        align: [
            "l",
            "r"
        ],
        stringLength: (str)=>{
            var ref8;
            return (ref = (ref8 = (0, _ansi).stripAnsi(str)) == null ? void 0 : ref8.length) != null ? ref : 0;
        }
    });
}

//# sourceMappingURL=printBundleSizes.js.map