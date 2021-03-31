"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
var Car_1 = __importDefault(require("./actors/Car"));
var CircuitManager_1 = require("./state/CircuitManager");
window.addEventListener("load", function () {
    // Get a reference to canvas dom tag
    var canvas = document.getElementById("root");
    var ctx = canvas.getContext("2d");
    var main_car = new Car_1.default({ x: 500, y: 200 });
    // SINGLETON -> gestor de estado del circuito y barreras del mismo
    CircuitManager_1.create_circuit(main_car);
    var actors = __spreadArray([main_car, CircuitManager_1.Circuit], CircuitManager_1.Circuit.barriers);
    // Game render loop
    var fps = 25;
    var frame = 0;
    setInterval(function () {
        // Clear the canvas
        ctx.clearRect(0, 0, 600, 400);
        // Update game actor objects
        actors.forEach(function (actor) { return actor.update(frame); });
        // Draw game actor objects
        actors.forEach(function (actor) {
            ctx.save();
            actor.draw(ctx);
            ctx.restore();
        });
        // Update current frame to make animations work
        frame += 1;
    }, 1000 / fps);
    window.addEventListener("keydown", function (e) {
        actors.forEach(function (actor) {
            if (actor.keyboardEventDown) {
                actor.keyboardEventDown(e.key);
            }
        });
    });
    window.addEventListener("keyup", function (e) {
        actors.forEach(function (actor) { return actor.keyboardEventUp && actor.keyboardEventUp(e.key); });
    });
});
