/* eslint-disable max-len */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Actor, IActor } from "../Actor";
import angle2rad from "../utils/angle2rad";
import { Point } from "../types/Point";
import { Circuit } from "../state/CircuitManager";

const BARRIER_TOUCH_LIMIT = 30;
export class Barrier extends Actor implements IActor {
  pos: Point;
  barrierWidth: number;
  angle: number;
  touched: boolean;
  coche: IActor;
  barrier_index: number;
  constructor(
    pos = { x: 0, y: 0 },
    bw = 60,
    angle = 0,
    coche: IActor,
    barrier_index: number
  ) {
    super(pos);
    this.pos = pos;
    this.barrierWidth = bw;
    this.angle = angle;
    this.touched = false;
    this.coche = coche;
    this.barrier_index = barrier_index;
  }

  update(frame: number) {
    if (Circuit.current_barrier === this.barrier_index) {
      const barrier_pos = this.position; // 2
      const car_pos = this.coche.position; // 1
      // Euclidean distance: https://es.wikipedia.org/wiki/Distancia_euclidiana
      const distance = Math.round(
        Math.sqrt(
          Math.pow(barrier_pos.x - car_pos.x, 2) +
            Math.pow(barrier_pos.y - car_pos.y, 2)
        )
      );

      if (distance <= BARRIER_TOUCH_LIMIT) {
        this.touched = true;
        Circuit.setLastTouchedBarrier(this.barrier_index);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(angle2rad(this.angle));
    this.touched ? (ctx.strokeStyle = "green") : (ctx.strokeStyle = "black");
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-this.barrierWidth / 2, 0);
    ctx.lineTo(this.barrierWidth / 2, 0);
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, 3, 0, angle2rad(360));
    ctx.closePath();
    ctx.stroke();

    ctx.fillText(`(${this.barrier_index})`, 0, 10);
  }

  keyboardEventDown(key: string) {}

  keyboardEventUp(key: string) {}
}
