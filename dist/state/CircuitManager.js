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
exports.create_circuit = exports.Circuit = void 0;
var Actor_1 = require("../Actor");
var Barrier_1 = require("../actors/Barrier");
var angle2rad_1 = __importDefault(require("../utils/angle2rad"));
var CircuitManager = /** @class */ (function (_super) {
    __extends(CircuitManager, _super);
    function CircuitManager(coche) {
        var _this = _super.call(this, { x: 10, y: 20 }) || this;
        _this.barriers = [];
        _this.current_barrier = 0;
        _this.total_laps = 1;
        _this.chrono = 0;
        _this.laps = 0;
        var num = 20;
        var center = { x: 300, y: 200 };
        var radius = 200;
        for (var i = 0; i < num; i++) {
            var angle = (360 / num) * i + 90;
            _this.barriers.push(new Barrier_1.Barrier({
                x: center.x + Math.sin(angle2rad_1.default(angle)) * radius,
                y: center.y + Math.cos(angle2rad_1.default(angle)) * radius,
            }, 80, -angle + 90, coche, i));
        }
        return _this;
    }
    CircuitManager.prototype.update = function (frame) {
        var barreras_tocadas = this.barriers.filter(function (b) { return b.touched; })
            .length;
        var total_barriers = this.barriers.length;
        if (barreras_tocadas === total_barriers) {
            this.nextLap();
        }
        else {
            //   console.log(
            //     `QUEDAN ${total_barriers - barreras_tocadas} barreras por tocar`
            //   );
        }
        this.chrono += 1 / 25;
    };
    CircuitManager.prototype.setLastTouchedBarrier = function (idx) {
        this.current_barrier = idx + 1;
    };
    CircuitManager.prototype.nextLap = function () {
        // Reset barriers state
        this.barriers.forEach(function (b) {
            b.touched = false;
        });
        // Set next barrier to be touched to zero
        this.current_barrier = 0;
        // add one lap
        this.laps += 1;
        if (this.laps === this.total_laps) {
            alert("COMPLELTED " + this.get_chrono());
        }
    };
    CircuitManager.prototype.get_chrono = function () {
        return this.chrono.toFixed(2);
    };
    CircuitManager.prototype.draw = function (ctx) {
        ctx.translate(this.position.x, this.position.y);
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("LAPS: " + (this.laps + 1) + "/" + this.total_laps + " CHRONO " + this.get_chrono(), 0, 0);
    };
    return CircuitManager;
}(Actor_1.Actor));
var create_circuit = function (car) {
    exports.Circuit = new CircuitManager(car);
};
exports.create_circuit = create_circuit;
