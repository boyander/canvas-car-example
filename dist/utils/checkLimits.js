"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkLimits = function (pos) {
    if (pos.x < 600 && pos.x > -50 && pos.y < 400 && pos.y > -20) {
        return true;
    }
    return false;
};
exports.default = checkLimits;
