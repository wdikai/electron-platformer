import { Circle } from "./Circle";

export class CircleUtils {
    static intersectWithCircle(first: Circle, second: Circle): boolean {
        if(first === second) return false;

        if(first.position.equalTo(second.position)) return true;

        const squareDistanceBetweenCenters = Math.pow(first.position.x - second.position.x, 2) + Math.pow(first.position.y - second.position.y, 2);
        const minimumDistance = Math.pow(first.radius + second.radius, 2);

        return squareDistanceBetweenCenters < minimumDistance;
    }
}