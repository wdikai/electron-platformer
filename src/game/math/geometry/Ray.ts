import { Vector2D } from "../Vector2D";
import Point from "./Point";

export default class Ray {
    public readonly position: Point;
    public readonly direction: Vector2D;

    constructor(position: Point, direction: Vector2D) {
        this.position = position;
        this.direction = direction;
    }

    public toString(): string {
        return `Ray(position: ${this.position.toString()}, direction: ${this.direction.toString()})`;
    }
}