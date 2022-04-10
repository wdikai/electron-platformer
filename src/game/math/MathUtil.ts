export class MathUtil {
  static minMax(value: number, max: number, min: number = 0): number {
    return Math.min(Math.max(value, min), max);
  }

  static lerp(v0: number, v1: number, time: number): number {
    return (1 - time) * v0 + time * v1;
  }

}
