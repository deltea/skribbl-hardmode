import type { Sketch } from "p5-svelte";

export const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(800, 400);
  };

  p5.draw = () => {
    p5.background(220);
    p5.ellipse(p5.width / 2, p5.height / 2, 400, 400);
  };
};
