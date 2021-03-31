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
/* eslint-disable max-len */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var angle2rad_1 = __importDefault(require("../utils/angle2rad"));
var checkLimits_1 = __importDefault(require("../utils/checkLimits"));
var Actor_1 = require("../Actor");
var ferrariImg = require("../../assets/ferrari.png");
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(initial_pos, size) {
        if (initial_pos === void 0) { initial_pos = { x: 100, y: 100 }; }
        if (size === void 0) { size = { w: 10, h: 15 }; }
        var _this = _super.call(this, initial_pos) || this;
        _this.carSize = size;
        _this.carColor = "red";
        _this.angle = 0;
        _this.angleSpeed = 0;
        _this.carSpeed = 0;
        _this.carAcceleration = 0;
        _this.image = new Image();
        _this.image.src = ferrariImg;
        return _this;
    }
    Car.prototype.update = function (frame) {
        this.angle += this.angleSpeed;
        this.angleSpeed *= 0.9; // en cada frame, reducimos su velocidad a un 90%
        this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration; // la velocidad se va reduciendo pero la aceleración es constante
        var newPos = {
            x: this.position.x + Math.cos(angle2rad_1.default(this.angle)) * this.carSpeed,
            y: this.position.y + Math.sin(angle2rad_1.default(this.angle)) * this.carSpeed, // el giro es con respecto a la velocidad del ejeX y el ejeY
        };
        if (checkLimits_1.default(newPos)) {
            this.position = newPos;
        }
    };
    Car.prototype.draw = function (ctx) {
        // draw car
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(angle2rad_1.default(this.angle));
        ctx.fillStyle = this.carColor;
        ctx.rotate(angle2rad_1.default(180));
        ctx.drawImage(this.image, -25, -13.5, 50, 25);
        ctx.fillRect(-this.carSize.h / 2, -this.carSize.w / 2, this.carSize.h, this.carSize.w);
    };
    Car.prototype.keyboardEventDown = function (key) {
        if (key === "ArrowLeft") {
            this.angleSpeed = -4;
        }
        else if (key === "ArrowRight") {
            this.angleSpeed = 4;
        }
        else if (key === "ArrowUp") {
            this.carAcceleration = 1;
        }
        else if (key === "ArrowDown") {
            this.carAcceleration = -1;
        }
    };
    Car.prototype.keyboardEventUp = function (key) {
        if (key === "ArrowUp") {
            this.carAcceleration = 0;
        }
        else if (key === "ArrowDown") {
            this.carAcceleration = 0;
        }
    };
    return Car;
}(Actor_1.Actor));
exports.default = Car;
