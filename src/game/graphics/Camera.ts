import Point from '../math/geometry/Point';
import { MathUtil } from '../math/MathUtil';

export class Camera {
  width: number;
  height: number;
  position: Point;
  scale: number;

  constructor(
    width: number,
    height: number,
  ) {
    this.width = width;
    this.height = height;
    this.position = Point.zero;
    this.scale = 1;
  }

  setCenter(x: number, y: number): void {
    const halfWidth = this.width / 2;
    const halfHieght = this.height / 2;
    this.position.x = MathUtil.minMax(x - halfWidth, 2860 - this.width, 0);
    this.position.y = MathUtil.minMax(y - halfHieght, 1440 - this.height, 0);
  }
}
