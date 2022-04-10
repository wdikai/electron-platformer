import { Vector2D } from "../Vector2D";
import { Rectangle } from "./Rectangle";

export class RectangleUtils {
    static intersectWithRectandle(first: Rectangle, second: Rectangle): boolean {
        return (
            first !== second &&
            first.left < second.right &&
            first.right > second.left &&
            first.top < second.bottom &&
            first.bottom > second.top
        );
    }

    static intersectWithOffset(first: Rectangle, second: Rectangle, offset: Vector2D): boolean {
        return (
            first !== second &&
            first.left + offset.x < second.right &&
            first.right + offset.x > second.left &&
            first.top + offset.y < second.bottom &&
            first.bottom + offset.y > second.top
        );
    }
}