import { Vector2D } from "../math/Vector2D";
import { Rectangle } from "../math/geometry/Rectangle";
import { Collider } from "./Collider";

export class DinamicObject extends Collider {
    rectangle: Rectangle;
    velocity: Vector2D;
    hasGravity: boolean;

    constructor(colider: Rectangle) {
        super(colider);

        this.velocity = Vector2D.zero;
        this.hasGravity = true;
    }
  
    move(speed: Vector2D): void {
      this.rectangle.position.x += speed.x;
      this.rectangle.position.y += speed.y;
    }
}