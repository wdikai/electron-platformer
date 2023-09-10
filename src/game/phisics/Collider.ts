import { Rectangle } from "../math/geometry/Rectangle";
import { RectangleUtils } from "../math/geometry/RectangleUtils";
import { Vector2D } from "../math/Vector2D";

export class Collider {
    rectangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle;
    }

    intersectWith(object: Collider, offset: Vector2D = Vector2D.zero): boolean {
        return RectangleUtils.intersectWithRectandleWithOffset(this.rectangle, object.rectangle, offset);
    }
}