// deno-lint-ignore-file no-this-alias
import { CanvasRenderingContext2D } from "canvas";
import { fill, outline, stroke } from "./draw.js";

export function createCircle(
  ctx: CanvasRenderingContext2D,
  options: CircleOptions
): CircleReturn {
  if (!options) options = {};
  if (!options.x) options.x = 0;
  if (!options.y) options.y = 0;
  if (!options.color) options.color = "black";
  if (!options.radius && options.radius != 0) options.radius = 50;

  return {
    x: options.x,
    y: options.y,
    radius: options.radius,
    color: options.color,
    draw(_options: CircleDrawOptions): CircleReturn {
      if (!_options) _options = {};
      if (!_options.drawType) _options.drawType = "fill";
      const x = _options.x == 0 ? 0 : _options.x || (options.x as number);
      const y = _options.y == 0 ? 0 : _options.y || (options.y as number);
      const radius = _options.radius || (options.radius as number);
      const color = _options.color || (options.color as string);
      const bColor = _options.bColor || (options.bColor as string);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.closePath();
      if (_options.drawType == "fill") fill(ctx, color);
      else if (_options.drawType == "stroke") stroke(ctx, color);
      else if (_options.drawType == "outline") {
        outline(ctx, color, bColor);
      }
      const draw = this;
      return {
        x,
        y,
        radius,
        color,
        draw(options: CircleDrawOptions): CircleReturn {
          return draw.draw(options);
        },
      };
    },
  };
}

export interface CircleOptions {
  x?: number;
  y?: number;
  color?: string;
  bColor?: string;
  radius?: number;
}

export interface CircleDrawOptions extends CircleOptions {
  drawType?: "fill" | "stroke" | "outline";
}

export interface CircleReturn extends CircleOptions {
  draw(options?: CircleDrawOptions): this;
}
