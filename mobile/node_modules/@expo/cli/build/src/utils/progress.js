"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setProgressBar = setProgressBar;
exports.getProgressBar = getProgressBar;
let currentProgress = null;
function setProgressBar(bar) {
    currentProgress = bar;
}
function getProgressBar() {
    return currentProgress;
}

//# sourceMappingURL=progress.js.map