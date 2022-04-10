import { Vector2D } from "../Vector2D";

export default class Point {
    static get zero(): Point {
        return new Point(0, 0);
    }

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toString(): string {
        return `Point(${this.x}, ${this.y})`;
    }

    public toVector(): Vector2D {
        return new Vector2D(this.x, this.y);
    }
}