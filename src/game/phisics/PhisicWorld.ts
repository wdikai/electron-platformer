import { Vector2D } from "../math/Vector2D";
import { CollisionManager, ICollisionManager } from "./CollisionManager";
import { DinamicObject } from "./DinamicObject";
import { Collider } from "./Collider";

const GRAVITY = 3;

export class PhisicWorld {
    private static _instance: PhisicWorld;

    static get instance(): PhisicWorld {
      if(!this._instance) {
        this._instance = new PhisicWorld();
      }

      return this._instance;
    }

    manager: ICollisionManager;
    dinamics: DinamicObject[];

    constructor() {
      this.manager = new CollisionManager();
      this.dinamics = [];
    }
  
    public update() {
      this.dinamics.forEach((dinamicObject) => {
        if(dinamicObject.hasGravity) {
          dinamicObject.velocity.add(new Vector2D(0, GRAVITY));
        }

        this.moveX(dinamicObject);
        this.moveY(dinamicObject);
      });
    }
  
    addCollider(collider: Collider): void {
      this.manager.addCollider(collider);
    }
  
    addDinamicObject(collider: DinamicObject): void {
      this.dinamics.push(collider);
      this.manager.addCollider(collider);
    }
  
    moveX(dinamicObject: DinamicObject): void {
      let stepDistance = Math.abs(dinamicObject.velocity.x) || 0;
      while (stepDistance > 0) {
        const step = new Vector2D(Math.sign(dinamicObject.velocity.x), 0);
        const collision = this.manager.checkCollision(dinamicObject, step);
        if (!collision.hasCollision) {
          dinamicObject.move(step);
          stepDistance--;
        } else {
          this.solveCollision(dinamicObject, collision, step);
          break;
        }
      }
    }
  
    moveY(dinamicObject: DinamicObject): void {
      let stepDistance = Math.abs(dinamicObject.velocity.y) || 0;
  
      while (stepDistance > 0) {
        const step = new Vector2D(0, Math.sign(dinamicObject.velocity.y));
        const collision = this.manager.checkCollision(dinamicObject, step);
        if (!collision.hasCollision) {
          dinamicObject.move(step);
          stepDistance--;
        } else {
          this.solveCollision(dinamicObject, collision, step);
          break;
        }
      }
    }
  
    solveCollision(collider, collision, movementSpeed) {
      if (movementSpeed.x) {
        collider.velocity.x = 0;
      }
      if (movementSpeed.y) {
        collider.velocity.y = 0;
      }
    }

    reset(): void {
      this.dinamics = [];
      this.manager.colliders = [];
    }
  }