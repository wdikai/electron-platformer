import Point from "./Point";

export class Rectangle {
  position: Point;
  w: number;
  h: number;

  constructor(x: number, y: number, w: number, h: number) {
    this.position = new Point(x, y);
    this.w = w;
    this.h = h;
  }

  get left(): number {
    return this.position.x;
  }

  get right(): number {
    return this.position.x + this.w;
  }

  get top(): number {
    return this.position.y;
  }

  get bottom(): number {
    return this.position.y + this.h;
  }

  public toString(): string {
    return `Rectangle(${this.position.x}, ${this.position.y}, ${this.w}, ${this.h})`;
  }
}