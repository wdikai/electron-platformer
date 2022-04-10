export class Vector2D {
  static get zero(): Vector2D {
    return new Vector2D(0, 0);
  }

  static get unitX(): Vector2D {
    return new Vector2D(1, 0);
  }

  static get unitY(): Vector2D {
    return new Vector2D(0, 1);
  }

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public get squereLength(): number {
    return this.x * this.x + this.y * this.y;
  }

  public get length(): number {
    return Math.sqrt(this.squereLength);
  }

  public get normilezed(): Vector2D {
    return this.copy().normileze();
  }

  public copy(): Vector2D {
    return new Vector2D(this.x, this.y);
  }

  public normileze(): Vector2D {
    const length = this.length;
    return this.divide(length);
  }

  public set(vector: Vector2D): Vector2D {
    return this.setX(vector.x).setY(vector.y);
  }

  public setX(value: number): Vector2D {
    this.x = value;

    return this;
  }

  public setY(value: number): Vector2D {
    this.y = value;

    return this;
  }

  public add(vector: Vector2D): Vector2D {
    return this.addX(vector.x).addY(vector.y);
  }

  public addX(value: number): Vector2D {
    this.x += value;

    return this;
  }

  public addY(value: number): Vector2D {
    this.y += value;

    return this;
  }

  public multiply(value: number): Vector2D {
    this.x *= value;
    this.y *= value;

    return this;
  }

  public divide(value: number): Vector2D {
    this.x /= value;
    this.y /= value;

    return this;
  }

  public reversed(): Vector2D {
    return this.multiply(-1);
  }

  public toString(): string {
    return `Vector(${this.x}, ${this.y})`;
  }
}
