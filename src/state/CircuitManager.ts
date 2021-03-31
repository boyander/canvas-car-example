import { Actor, IActor } from "../Actor";
import { Barrier } from "../actors/Barrier";
import angle2rad from "../utils/angle2rad";

class CircuitManager extends Actor implements IActor {
  barriers: Barrier[] = [];
  current_barrier: number = 0;
  total_laps: number = 1;
  chrono: number = 0;
  laps: number = 0;

  constructor(coche: IActor) {
    super({ x: 10, y: 20 });
    const num = 20;
    const center = { x: 300, y: 200 };
    const radius = 200;
    for (let i = 0; i < num; i++) {
      const angle = (360 / num) * i + 90;
      this.barriers.push(
        new Barrier(
          {
            x: center.x + Math.sin(angle2rad(angle)) * radius,
            y: center.y + Math.cos(angle2rad(angle)) * radius,
          },
          80,
          -angle + 90,
          coche,
          i
        )
      );
    }
  }

  update(frame: number) {
    let barreras_tocadas: number = this.barriers.filter((b) => b.touched)
      .length;
    let total_barriers: number = this.barriers.length;
    if (barreras_tocadas === total_barriers) {
      this.nextLap();
    } else {
      //   console.log(
      //     `QUEDAN ${total_barriers - barreras_tocadas} barreras por tocar`
      //   );
    }
    this.chrono += 1 / 25;
  }

  setLastTouchedBarrier(idx: number) {
    this.current_barrier = idx + 1;
  }

  nextLap() {
    // Reset barriers state
    this.barriers.forEach((b) => {
      b.touched = false;
    });

    // Set next barrier to be touched to zero
    this.current_barrier = 0;

    // add one lap
    this.laps += 1;
    if (this.laps === this.total_laps) {
      alert(`COMPLELTED ${this.get_chrono()}`);
    }
  }
  get_chrono() {
    return this.chrono.toFixed(2);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.position.x, this.position.y);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(
      `LAPS: ${this.laps + 1}/${this.total_laps} CHRONO ${this.get_chrono()}`,
      0,
      0
    );
  }
}

export let Circuit: CircuitManager;

export const create_circuit = (car: IActor) => {
  Circuit = new CircuitManager(car);
};
