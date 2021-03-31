/* eslint-disable max-len */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import angle2rad from "../utils/angle2rad";
import checkLimits from "../utils/checkLimits";
import { Point } from "../types/Point";
import { Actor, IActor } from "../Actor";

const ferrariImg = require("../../assets/ferrari.png");

type Size = { w: number; h: number };

class Car extends Actor implements IActor {
  carSize: Size;
  carColor: string;
  angle: number;
  angleSpeed: number;
  carSpeed: number;
  carAcceleration: number;
  image: HTMLImageElement;

  constructor(
    initial_pos: Point = { x: 100, y: 100 },
    size: Size = { w: 10, h: 15 }
  ) {
    super(initial_pos);
    this.carSize = size;
    this.carColor = "red";
    this.angle = 0;
    this.angleSpeed = 0;
    this.carSpeed = 0;
    this.carAcceleration = 0;
    this.image = new Image();
    this.image.src = ferrariImg;
  }

  update(frame: number) {
    this.angle += this.angleSpeed;
    this.angleSpeed *= 0.9; // en cada frame, reducimos su velocidad a un 90%
    this.carSpeed = this.carSpeed * 0.9 + this.carAcceleration; // la velocidad se va reduciendo pero la aceleración es constante

    const newPos: Point = {
      x: this.position.x + Math.cos(angle2rad(this.angle)) * this.carSpeed, // el giro es con respecto a la velocidad del ejeX y el ejeY
      y: this.position.y + Math.sin(angle2rad(this.angle)) * this.carSpeed, // el giro es con respecto a la velocidad del ejeX y el ejeY
    };

    if (checkLimits(newPos)) {
      this.position = newPos;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // draw car
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle2rad(this.angle));
    ctx.fillStyle = this.carColor;

    ctx.rotate(angle2rad(180));
    ctx.drawImage(this.image, -25, -13.5, 50, 25);
    ctx.fillRect(
      -this.carSize.h / 2,
      -this.carSize.w / 2,
      this.carSize.h,
      this.carSize.w
    );
  }

  keyboardEventDown(key: string) {
    if (key === "ArrowLeft") {
      this.angleSpeed = -4;
    } else if (key === "ArrowRight") {
      this.angleSpeed = 4;
    } else if (key === "ArrowUp") {
      this.carAcceleration = 1;
    } else if (key === "ArrowDown") {
      this.carAcceleration = -1;
    }
  }
  keyboardEventUp(key: string) {
    if (key === "ArrowUp") {
      this.carAcceleration = 0;
    } else if (key === "ArrowDown") {
      this.carAcceleration = 0;
    }
  }
}

export default Car;
