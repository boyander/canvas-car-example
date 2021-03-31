"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Barrier = void 0;
/* eslint-disable max-len */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var Actor_1 = require("../Actor");
var angle2rad_1 = __importDefault(require("../utils/angle2rad"));
var CircuitManager_1 = require("../state/CircuitManager");
var BARRIER_TOUCH_LIMIT = 30;
var Barrier = /** @class */ (function (_super) {
    __extends(Barrier, _super);
    function Barrier(pos, bw, angle, coche, barrier_index) {
        if (pos === void 0) { pos = { x: 0, y: 0 }; }
        if (bw === void 0) { bw = 60; }
        if (angle === void 0) { angle = 0; }
        var _this = _super.call(this, pos) || this;
        _this.pos = pos;
        _this.barrierWidth = bw;
        _this.angle = angle;
        _this.touched = false;
        _this.coche = coche;
        _this.barrier_index = barrier_index;
        return _this;
    }
    Barrier.prototype.update = function (frame) {
        if (CircuitManager_1.Circuit.current_barrier === this.barrier_index) {
            var barrier_pos = this.position; // 2
            var car_pos = this.coche.position; // 1
            // Euclidean distance: https://es.wikipedia.org/wiki/Distancia_euclidiana
            var distance = Math.round(Math.sqrt(Math.pow(barrier_pos.x - car_pos.x, 2) +
                Math.pow(barrier_pos.y - car_pos.y, 2)));
            if (distance <= BARRIER_TOUCH_LIMIT) {
                this.touched = true;
                CircuitManager_1.Circuit.setLastTouchedBarrier(this.barrier_index);
            }
        }
    };
    Barrier.prototype.draw = function (ctx) {
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(angle2rad_1.default(this.angle));
        this.touched ? (ctx.strokeStyle = "green") : (ctx.strokeStyle = "black");
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-this.barrierWidth / 2, 0);
        ctx.lineTo(this.barrierWidth / 2, 0);
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 3, 0, angle2rad_1.default(360));
        ctx.closePath();
        ctx.stroke();
        ctx.fillText("(" + this.barrier_index + ")", 0, 10);
    };
    Barrier.prototype.keyboardEventDown = function (key) { };
    Barrier.prototype.keyboardEventUp = function (key) { };
    return Barrier;
}(Actor_1.Actor));
exports.Barrier = Barrier;
