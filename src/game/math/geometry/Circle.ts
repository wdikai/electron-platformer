import Point from "./Point";

export class Circle {
  position: Point;
  radius: number;

  constructor(x: number, y: number, radius: number) {
    this.position = new Point(x, y);
    this.radius = radius;
  }

  public toString(): string {
    return `Circle(${this.position.x}, ${this.position.y}, ${this.radius})`;
  }
}