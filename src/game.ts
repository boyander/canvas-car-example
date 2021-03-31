/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Car from "./actors/Car";
import { create_circuit, Circuit } from "./state/CircuitManager";

window.addEventListener("load", () => {
  // Get a reference to canvas dom tag
  const canvas: HTMLCanvasElement = document.getElementById(
    "root"
  ) as HTMLCanvasElement;

  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const main_car = new Car({ x: 500, y: 200 });
  // SINGLETON -> gestor de estado del circuito y barreras del mismo
  create_circuit(main_car);

  const actors = [main_car, Circuit, ...Circuit.barriers];

  // Game render loop
  const fps = 25;
  let frame = 0;
  setInterval(() => {
    // Clear the canvas
    ctx.clearRect(0, 0, 600, 400);

    // Update game actor objects
    actors.forEach((actor) => actor.update(frame));

    // Draw game actor objects
    actors.forEach((actor) => {
      ctx.save();
      actor.draw(ctx);
      ctx.restore();
    });

    // Update current frame to make animations work
    frame += 1;
  }, 1000 / fps);

  window.addEventListener("keydown", (e) => {
    actors.forEach((actor) => {
      if (actor.keyboardEventDown) {
        actor.keyboardEventDown(e.key);
      }
    });
  });
  window.addEventListener("keyup", (e) => {
    actors.forEach(
      (actor) => actor.keyboardEventUp && actor.keyboardEventUp(e.key)
    );
  });
});
