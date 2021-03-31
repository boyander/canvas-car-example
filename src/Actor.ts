/* eslint-disable no-unused-vars */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Point } from "./types/Point";

export interface IActor {
  position: Point;
  update?: (delta: number) => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  keyboardEventDown?: (key: string) => void;
  keyboardEventUp?: (key: string) => void;
}

export class Actor {
  position: Point;

  constructor(posisiton: Point) {
    this.position = posisiton;
  }
}
