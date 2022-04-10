import Ray from "./Ray";
import { Rectangle } from "./Rectangle";

export class RayUtils {
  static hitRectangle(ray: Ray, rectangle: Rectangle) {
    let result = [];
    const tMinX = (rectangle.left - ray.position.x) / ray.direction.x;
    const tMaxX = (rectangle.right - ray.position.x) / ray.direction.x;
    const tMinY = (rectangle.top - ray.position.y) / ray.direction.y;
    const tMaxY = (rectangle.bottom - ray.position.y) / ray.direction.y;

    const tMin = Math.max(
      Math.min(tMinX, tMaxX),
      Math.min(tMinY, tMaxY)
    );

    const tMax = Math.min(
      Math.max(tMinX, tMaxX),
      Math.max(tMinY, tMaxY)
    );

    if (tMax < 0 || tMin > tMax) {
      return result;
    }

    if (tMin >= 0) {
      result.push(
        ray.position
          .toVector()
          .add(
            ray.direction
              .copy()
              .multiply(tMin)
          )
      );
    }

    result.push(
      ray.position
        .toVector()
        .add(
          ray.direction
            .copy()
            .multiply(tMax)
        )
    );

    return result;
  }
}