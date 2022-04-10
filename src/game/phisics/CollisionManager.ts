import { Vector2D } from "../math/Vector2D";
import { Collider } from "./Collider";

export interface ICollision {
    collider: Collider;
    collideWith?: Collider;
    pair: Collider[];
    hasCollision: boolean;
}

export interface ICollisionManager {
    colliders: Collider[];
    addCollider(collider: Collider): void;
    checkCollision(collider: Collider, offset: Vector2D): ICollision;
}

export class CollisionManager {
    colliders: Collider[];

    constructor() {
      this.colliders = [];
    }
  
    public addCollider(collider: Collider): void {
      this.colliders.push(collider);
    }
  
    public checkCollision(collider: Collider, offset = Vector2D.zero): ICollision {
      for (let otherCollider of this.colliders) {
        if (collider.intersectWith(otherCollider, offset)) {
          return {
            collider,
            collideWith: otherCollider,
            pair: [collider, otherCollider],
            hasCollision: true,
          };
        }
      }
  
      return {
        collider,
        pair: [],
        hasCollision: false,
      };
    }
  }
  